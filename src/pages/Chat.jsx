import React, { useState } from 'react';

import LeftSide from '../components/Chat/LeftSide';
import DialogFlow from '../components/Chat/DialogFlow';
import RightSide from '../components/Chat/RightSide';

import ChatProductBox from '../components/Chat/Attach/ChatProductBox';

const Chat = () => {
  const [openProductsBox, setOpenProductsBox] = useState(false);
  const [attachedProducts, setAttachedProducts] = useState([]);

  // Pull Data From <ChatProductBox />
  const pull_data = (data) => {
    if (!data) return;

    const attachedProductsArr = [];
    data.map((item) => attachedProductsArr.push(item));

    setAttachedProducts(attachedProductsArr);
  };

  return (
    <main
      onClick={() => {
        if (openProductsBox) {
          setOpenProductsBox(false);
        }
      }}
    >
      <div className="flex h-[calc(100vh-5vh)] antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          {/* Left Side */}
          <LeftSide />

          {/* Chat Dialog */}
          <DialogFlow
            onOpen={() => {
              setOpenProductsBox(true);
            }}
            fetchAttachedProducts={attachedProducts}
          />

          {/* Right Side */}
          <RightSide />
        </div>
      </div>

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
