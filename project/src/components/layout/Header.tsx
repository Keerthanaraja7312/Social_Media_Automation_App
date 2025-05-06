import React, { useState } from 'react';
import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockNotifications } from '../../data/mockData';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Menu button (mobile) and title */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800 dark:text-white">
            SocialAutomator
          </h1>
        </div>

        {/* Right: User menu, notifications, theme toggle */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Bell size={20} />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No notifications
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"}
                alt="User avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                {user?.name || "User"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;