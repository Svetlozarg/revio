import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useAuth } from './contexts/ContextProvider';

import { Navbar, Sidebar, ThemeSettings } from './components';
import { Dashboard, Orders, Reviews } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';

const App = () => {
  // Get user, login function
  const { user } = useAuth();

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div>
      {user && (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
          <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
              <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: '1000' }}
              >
                <TooltipComponent content="Settings" position="Top">
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div>
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
                <div>
                  {themeSettings && <ThemeSettings />}

                  <Routes>
                    {/* Authentication */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Dashboard  */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Pages  */}
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </div>
      )}

      {!user && (
        <BrowserRouter>
          <Routes>
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
