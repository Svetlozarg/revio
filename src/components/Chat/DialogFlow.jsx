import { useEffect, useState, useRef } from 'react';
import AttachedProduct from '../../components/Chat/Attach/AttachedProduct';
import addProductImage from '../../assets/add-product.png';
import { FaBolt } from 'react-icons/fa';
import TemplatesBox from './Templates/TemplatesBox';

const DialogFlow = ({ fetchAttachedProducts, onOpen, openThemplates }) => {
  const [loading, setLoading] = useState(false);
  const [attachedProducts, setAttachedProducts] = useState([]);
  const [isOpenTemplatesBox, setIsOpenTemplatesBox] = useState(false);
  const [messageFlow, setMessageFlow] = useState([]);
  const message = useRef('');

  // Handle Remove Attached Item
  const productIndex = (index) => {
    if (!index) return;

    setLoading(true);

    const dataArray = attachedProducts;

    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].title === index) {
        dataArray.splice(i, 1);
      }
    }

    setAttachedProducts(dataArray);

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const sendMessage = (e) => {
    if (message.current.value === '') return;

    if (e.key === 'Enter') {
      const msgArray = JSON.parse(localStorage.getItem('message'));
      if (msgArray) {
        if (attachedProducts.length !== 0) {
          const msgObj = {
            message: message.current.value,
            prodcuts: attachedProducts,
          };
          msgArray.push(msgObj);

          localStorage.setItem('message', JSON.stringify(msgArray));
        } else {
          const msgObj = {
            message: message.current.value,
            prodcuts: [],
          };
          msgArray.push(msgObj);

          localStorage.setItem('message', JSON.stringify(msgArray));
        }
      } else {
        if (attachedProducts.length !== 0) {
          const msgObj = [
            {
              message: message.current.value,
              prodcuts: attachedProducts,
            },
          ];

          localStorage.setItem('message', JSON.stringify(msgObj));
        } else {
          const msgObj = [
            {
              message: message.current.value,
              prodcuts: [],
            },
          ];

          localStorage.setItem('message', JSON.stringify(msgObj));
        }
      }

      updateMessageFlow(msgArray);
      message.current.value = '';
      setAttachedProducts([]);
    }
  };

  const updateMessageFlow = (msgArray) => {
    setMessageFlow(msgArray);
  };

  useEffect(() => {
    if (setMessageFlow(JSON.parse(localStorage.getItem('message')))) {
      setMessageFlow(JSON.parse(localStorage.getItem('message')));
    }
  }, []);

  useEffect(() => {
    setAttachedProducts(fetchAttachedProducts);
  }, [fetchAttachedProducts]);

  return (
    <div className="flex flex-col flex-auto h-full px-6" onOpen={onOpen}>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>Hey How are you today?</div>
                  </div>
                </div>
              </div>
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Vel ipsa commodi illum saepe numquam maxime asperiores
                      voluptate sit, minima perspiciatis.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm bg-[#dcf8c6] py-2 px-4 shadow rounded-xl">
                    <div>I'm ok what about you?</div>
                  </div>
                </div>
              </div>
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>Lorem ipsum dolor sit amet !</div>
                  </div>
                </div>
              </div>
              <div className="col-start-4 col-end-12 p-3 rounded-lg">
                <div
                  id="toast-simple"
                  className="flex items-center p-2 space-x-2 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                  role="alert"
                >
                  <div className="pl-4 text-xs font-normal color-grey">
                    Henry Boyd has successfuly ordered the product
                  </div>
                </div>
              </div>
              <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm bg-[#dcf8c6] py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                  </div>
                </div>
              </div>

              {messageFlow?.map((msg, i) => {
                return (
                  <div
                    key={i}
                    className="col-start-6 col-end-13 p-3 rounded-lg"
                  >
                    <div className="flex items-start justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-[#dcf8c6] py-2 px-4 shadow rounded-xl">
                        {msg.message && (
                          <p
                            className={msg.prodcuts.length !== 0 ? 'pt-1' : ''}
                          >
                            {msg.message}
                          </p>
                        )}
                        <div
                          className={
                            msg.prodcuts.length !== 0
                              ? 'snap-y snap-mandatory h-full w-full mx:auto overflow-auto flex gap-2 pb-1'
                              : ''
                          }
                          style={
                            msg.message && msg.prodcuts.length !== 0
                              ? { marginTop: '1rem' }
                              : {}
                          }
                        >
                          {msg.prodcuts?.map((product) => {
                            return (
                              <img
                                className="w-auto h-36 rounded-2xl snap-start"
                                src={product.image}
                                alt=""
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          {/* Products Button */}
          <div>
            <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
              <img
                src={addProductImage}
                width={25}
                height={25}
                alt="add products button img"
                onClick={onOpen}
              />
            </button>
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                ref={message}
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                onKeyDown={sendMessage}
              />
              <button
                className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                onClick={openThemplates}
              >
                {/* Thempalte Button */}
                <FaBolt
                  onClose={() => {
                    setIsOpenTemplatesBox(false);
                  }}
                />
              </button>
            </div>
          </div>
          <div className="ml-4">
            <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
              <span>Send</span>
            </button>
          </div>
        </div>
        {/* Attached Products */}
        {attachedProducts.length !== 0 && (
          <div className="w-auto h-36 flex overflow-x-scroll overflow-y-hidden">
            {attachedProducts &&
              !loading &&
              attachedProducts.map((attachedProduct, i) => {
                return (
                  <AttachedProduct
                    key={i}
                    title={attachedProduct.title}
                    image={attachedProduct.image}
                    deleteProduct={productIndex}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogFlow;
