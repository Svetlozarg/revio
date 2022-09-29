import React, { useEffect } from 'react';
import { useAuth } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleUpdateEmail = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const { email } = user;
    // Prompt for current password
    const password = prompt('Type your current password');

    const credential = EmailAuthProvider.credential(email, password);

    // Prompt for new email
    const newEmail = prompt('Type your new email');
    // Prompt for repeat new email
    const repeatNewEmail = prompt('Repeat your new email');

    // Check if emails match
    if (newEmail === repeatNewEmail) {
      // Reauth user with email and password
      await reauthenticateWithCredential(user, credential)
        .then(async () => {
          // Update new email
          await updateEmail(auth.currentUser, newEmail).catch((error) => {
            console.log(error.message);
          });

          alert('Email successfully updated');

          location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert('Emails do not match');
    }
  };

  const handleUpdatePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const { email } = user;
    // Prompt for current password
    const password = prompt('Type your current password');

    const credential = EmailAuthProvider.credential(email, password);

    // Prompt for new password
    const newPassword = prompt('Type your new password');
    // Prompt for repeat new password
    const repeatNewPassword = prompt('Repeat your new password');

    if (newPassword === repeatNewPassword) {
      await reauthenticateWithCredential(user, credential)
        .then(async () => {
          // Update new password
          await updatePassword(auth.currentUser, newPassword).catch((error) => {
            console.log(error.message);
          });

          alert('Password successfully updated');

          logout();

          navigate('/login');

          location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert('Passwords do not match');
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-8 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-400">Orders</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">Users</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">Reviews</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Connect
              </button>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {user.displayName}
            </h1>
            <p className="mt-8 text-gray-500">Email - {user.email}</p>
          </div>

          <div className="mt-12 flex justify-center items-center align-center">
            <div className="flex flex-col gap-y-2">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleUpdateEmail}
              >
                Change Email
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleUpdatePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
