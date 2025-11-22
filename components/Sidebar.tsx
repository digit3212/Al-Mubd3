
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PenTool, 
  Image as ImageIcon, 
  Search, 
  Lightbulb, 
  Info, 
  Shield, 
  FileText, 
  Mail,
  LogOut,
  Layers,
  Home,
  BookOpen
} from 'lucide-react';
import { NavItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const mainNavItems: NavItem[] = [
    { label: 'الرئيسية', path: '/', icon: Home },
    { label: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { label: 'المدونة', path: '/blog', icon: BookOpen },
    { label: 'مجتمع المبدعين', path: '/dashboard/community', icon: Users },
    { label: 'كاتب المقالات', path: '/dashboard/writer', icon: PenTool },
    { label: 'مولد الصور', path: '/dashboard/image-gen', icon: ImageIcon },
    { label: 'محلل SEO', path: '/dashboard/seo', icon: Search },
    { label: 'أفكار محتوى', path: '/dashboard/ideas', icon: Lightbulb },
  ];

  const infoNavItems: NavItem[] = [
    { label: 'من نحن', path: '/about', icon: Info },
    { label: 'سياسة الخصوصية', path: '/privacy', icon: Shield },
    { label: 'شروط الاستخدام', path: '/terms', icon: FileText },
    { label: 'اتصل بنا', path: '/contact', icon: Mail },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const NavLinkItem: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={() => { if (window.innerWidth < 768) toggleSidebar() }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 mb-1 ${
          isActive 
            ? 'bg-primary/10 text-primary font-bold' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
        }`}
      >
        <item.icon size={20} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside 
      className={`fixed top-0 right-0 z-40 h-screen w-64 bg-white border-l border-gray-200 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static overflow-y-auto`}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-100 px-6">
        <div className="flex items-center gap-2 text-primary font-black text-2xl">
          <Layers size={32} className="text-secondary" />
          <span>المبدع</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          الأدوات
        </div>
        <nav className="mb-8">
          {mainNavItems.map((item) => (
            <NavLinkItem key={item.path} item={item} />
          ))}
        </nav>

        <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          معلومات الموقع
        </div>
        <nav>
          {infoNavItems.map((item) => (
            <NavLinkItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-white">
         <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full">
            <LogOut size={20} />
            <span>تسجيل خروج</span>
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
