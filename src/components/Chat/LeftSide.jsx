import { useState, useEffect } from 'react';
import logo from '../../assets/small_logo.png';
import { useNavigate } from 'react-router-dom';
import { chatUsersData } from '../../assets/data';

const LeftSide = ({ getUrl }) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [chatUser, setChatUser] = useState('0885325849');

  // Set url to open chatroom
  const handleUrl = () => {
    let search = window.location.search;

    if (search === '' || search === null || search === undefined) {
      navigate(`/inbox?phone=${chatUser}`);
    } else {
      getUrl(search);
    }
  };

  useEffect(() => {
    if (chatUser) {
      handleUrl();
    }
  }, [chatUser]);

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 rounded-2xl">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        {/* Chat Logo */}
        <img src={logo} style={{ width: '35px' }} alt="" />
        <div className="ml-2 font-bold text-2xl">RevioChat</div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-sm">
          <span className="font-bold">Active Conversations</span>
          {/* Application Button */}
          {/* <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-3xl mr-5">
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownDefaultRadio"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-1.5 py-0.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setOpen(!isOpen)}
            >
              App
              <svg
                className="ml-2 w-4 h-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isOpen && (
              <div
                id="dropdownDefaultRadio"
                className="z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="bottom"
                style={{
                  position: 'absolute',
                  inset: '0px auto auto 0px',
                  margin: '0px',
                  transform: 'translate(412px, 200px)',
                }}
              >
                <ul
                  className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div className="flex items-center">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        defaultChecked
                      />
                      <label
                        for="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Viber
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        id="default-radio-3"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="default-radio-3"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Whatsapp
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </span> */}
        </div>
        {/* Chats */}
        <div
          className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto"
          style={{ height: '570px' }}
        >
          {chatUsersData.map((user, i) => {
            return (
              <button
                disabled={i === 0 ? false : true}
                className={
                  i === 0
                    ? 'flex flex-row items-center bg-gray-200 rounded-xl p-2'
                    : 'flex flex-row items-center bg-gray-100 rounded-xl p-2'
                }
              >
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  {user.short}
                </div>
                <div className="ml-2 text-sm font-semibold">{user.name}</div>
                <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                  8
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
