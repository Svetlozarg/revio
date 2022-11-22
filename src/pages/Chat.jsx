import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import LeftSide from '../components/Chat/LeftSide';
import DialogFlow from '../components/Chat/DialogFlow';
import RightSide from '../components/Chat/RightSide';

import ChatProductBox from '../components/Chat/Attach/ChatProductBox';
import TemplatesBox from '../components/Chat/Templates/TemplatesBox';

const Chat = () => {
  const [openProductsBox, setOpenProductsBox] = useState(false);
  const [attachedProducts, setAttachedProducts] = useState([]);
  const [openTemplatesBox, setOpenTemplatesBox] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [ordersObj, setOrdersObj] = useState('');

  // Pull Data From <ChatProductBox />
  const pull_data = (data) => {
    if (!data) return;

    const attachedProductsArr = [];
    data.map((item) => attachedProductsArr.push(item));

    setAttachedProducts(attachedProductsArr);
  };

  // Pull phone to open chat room
  const get_url = (data) => {
    setUserPhone(data.split('=')[1]);
  };

  const fetchData = async () => {
    if (userPhone) {
      // TODO: Fetch store name to pass to getDocs
      let store = 'Bob';

      // Fetch information and orders for user
      const querySnapshot = await getDocs(
        collection(db, `stores/${store}/orders`)
      );
      const ordersArr = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().customer.phone === userPhone) {
          ordersArr.push(doc.data());
        }
      });

      setOrdersObj(ordersArr);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (userPhone) {
      fetchData();
    }
  }, [userPhone]);

  return (
    <main>
      <div className="flex h-[calc(100vh-5vh)] antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          {/* Left Side */}
          <LeftSide getUrl={get_url} />

          {/* Chat Dialog */}
          <DialogFlow
            onOpen={() => {
              setOpenProductsBox(true);
            }}
            openThemplates={() => {
              setOpenTemplatesBox(true);
            }}
            fetchAttachedProducts={attachedProducts}
          />

          {/* Right Side */}
          <RightSide ordersArr={ordersObj} />
        </div>
      </div>

      {/* Themplate Box */}
      {openTemplatesBox && (
        <TemplatesBox
          onClose={() => {
            setOpenTemplatesBox(false);
          }}
        />
      )}

      {/* ProductsBox PopUp */}
      {openProductsBox && (
        <ChatProductBox
          onClose={() => {
            setOpenProductsBox(false);
          }}
          getProducts={pull_data}
          attachedProducts={
            attachedProducts.length !== 0 ? attachedProducts : null
          }
        />
      )}
    </main>
  );
};

export default Chat;
