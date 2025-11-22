
import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>
        
        <div className="relative hidden md:block w-96">
          <input 
            type="text" 
            placeholder="بحث في أدواتك..." 
            className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-r border-gray-200 pr-4 mr-2">
          <div className="hidden md:block text-left">
            <div className="text-sm font-bold text-gray-800">{user?.name || 'ضيف'}</div>
            <div className="text-xs text-gray-500">Plan: {user?.plan || 'Basic'}</div>
          </div>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary uppercase font-bold">
            {user?.name ? user.name.charAt(0) : <User size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
