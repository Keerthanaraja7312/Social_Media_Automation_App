import React from 'react';
import { X, Home, BarChart2, Calendar, Settings, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAdmin, logout } = useAuth();

  const navItems = [
    { icon: <Home size={20} />, name: 'Dashboard', path: '/' },
    { icon: <Calendar size={20} />, name: 'Content Calendar', path: '/calendar' },
    { icon: <BarChart2 size={20} />, name: 'Analytics', path: '/analytics' },
    { icon: <Settings size={20} />, name: 'Settings', path: '/settings' },
  ];

  // Add admin-only navigation items
  const adminItems = [
    { icon: <Users size={20} />, name: 'User Management', path: '/admin/users' },
  ];

  // Only show admin items to admin users
  const allNavItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            SocialAutomator
          </h1>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col px-4 py-6 space-y-1">
          {allNavItems.map((item) => (
            <a
              key={item.path}
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-500 dark:text-gray-400 mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-gray-500 dark:text-gray-400 mr-3">
              <LogOut size={20} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;