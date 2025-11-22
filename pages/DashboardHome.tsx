
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Image as ImageIcon, 
  Search, 
  Lightbulb, 
  TrendingUp, 
  Zap, 
  Crown, 
  BarChart3, 
  FileText, 
  Clock,
  Activity
} from 'lucide-react';
import { getStats, getActivities, getWeeklyChartData, Stats, Activity as ActivityType } from '../services/storageService';

const DashboardHome = () => {
  const [stats, setStats] = useState<Stats>({ words: 0, images: 0, seoCount: 0, ideasCount: 0 });
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [chartData, setChartData] = useState<{day: string, value: number, raw: number}[]>([]);

  useEffect(() => {
    setStats(getStats());
    setActivities(getActivities());
    setChartData(getWeeklyChartData());
  }, []);

  const formatTime = (timestamp: number) => {
      const seconds = Math.floor((Date.now() - timestamp) / 1000);
      if (seconds < 60) return 'الآن';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `منذ ${minutes} دقيقة`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `منذ ${hours} ساعة`;
      return 'منذ أيام';
  };

  const getActivityIcon = (type: string) => {
      switch(type) {
          case 'article': return <FileText size={18}/>;
          case 'image': return <ImageIcon size={18}/>;
          case 'seo': return <Search size={18}/>;
          case 'idea': return <Lightbulb size={18}/>;
          default: return <Activity size={18}/>;
      }
  };

  const getActivityColor = (type: string) => {
      switch(type) {
          case 'article': return 'bg-blue-50 text-blue-600';
          case 'image': return 'bg-purple-50 text-purple-600';
          case 'seo': return 'bg-green-50 text-green-600';
          case 'idea': return 'bg-yellow-50 text-yellow-600';
          default: return 'bg-gray-50 text-gray-600';
      }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 mb-1">مرحباً، المبدع 👋</h1>
          <p className="text-gray-500">إليك ملخص نشاطك الإبداعي الفعلي.</p>
        </div>
        <Link to="/dashboard/writer" className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors flex items-center gap-2">
           <Zap size={20} className="text-secondary" />
           إنشاء محتوى جديد
        </Link>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Word Credit Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <FileText size={24} />
              </div>
              <span className="flex items-center text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full gap-1">
                  نشط <TrendingUp size={12} />
              </span>
           </div>
           <div className="text-gray-500 text-sm font-bold mb-1">كلمات تم إنشاؤها</div>
           <div className="text-3xl font-black text-gray-800 mb-4">{stats.words.toLocaleString()} <span className="text-sm text-gray-400 font-normal">كلمة</span></div>
           
           <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
               <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.words / 10000) * 100, 100)}%` }}></div>
           </div>
           <div className="mt-2 text-xs text-gray-400 text-left">إحصائيات حقيقية بناءً على استخدامك</div>
        </div>

        {/* Images Generated Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <ImageIcon size={24} />
              </div>
              <span className="flex items-center text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full gap-1">
                  {stats.images > 0 ? '+1' : '0'} <TrendingUp size={12} />
              </span>
           </div>
           <div className="text-gray-500 text-sm font-bold mb-1">صور مولدة</div>
           <div className="text-3xl font-black text-gray-800 mb-4">{stats.images} <span className="text-sm text-gray-400 font-normal">صورة</span></div>
           <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
               <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.images / 50) * 100, 100)}%` }}></div>
           </div>
           <div className="mt-2 text-xs text-gray-400 text-left">أطلق العنان لخيالك!</div>
        </div>

        {/* Plan Status Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-white/10 rounded-xl text-secondary">
                  <Crown size={24} />
              </div>
              <span className="text-secondary text-xs font-bold border border-secondary/30 px-2 py-1 rounded-full">
                  BASIC PLAN
              </span>
           </div>
           <div className="text-gray-400 text-sm font-bold mb-1">الخطة الحالية</div>
           <div className="text-2xl font-black text-white mb-4">الباقة المجانية</div>
           <button className="w-full py-2 bg-secondary text-primary-dark rounded-lg font-bold text-sm hover:bg-secondary-hover transition-colors">
               ترقية الحساب
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column: Tools & Chart */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Usage Chart Section */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <BarChart3 size={20} className="text-primary"/>
                          تحليل الاستخدام الأسبوعي
                      </h3>
                      <select className="bg-gray-50 border-none text-xs font-bold text-gray-500 rounded-lg p-2 outline-none cursor-pointer hover:text-primary">
                          <option>آخر 7 أيام</option>
                      </select>
                  </div>
                  
                  {/* CSS Bar Chart */}
                  <div className="flex items-end justify-between h-48 gap-2 sm:gap-4 pt-4 border-t border-gray-50">
                      {chartData.map((item, index) => (
                          <div key={index} className="flex flex-col items-center gap-2 group flex-1">
                              <div className="w-full max-w-[40px] bg-gray-100 rounded-t-lg relative h-full flex items-end group-hover:bg-blue-50 transition-colors cursor-default">
                                  <div 
                                    className="w-full bg-primary rounded-t-lg transition-all duration-1000 relative group-hover:bg-secondary"
                                    style={{ height: `${Math.max(item.value, 5)}%` }} // Min height 5% for visual
                                  >
                                      {/* Tooltip */}
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                          {item.raw} عملية
                                      </div>
                                  </div>
                              </div>
                              <span className="text-xs font-bold text-gray-400">{item.day}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Quick Tools Grid */}
              <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">الوصول السريع</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link to="/dashboard/writer" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group text-center">
                          <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <PenTool size={24} />
                          </div>
                          <div className="font-bold text-gray-700 text-sm">كاتب المقالات</div>
                      </Link>
                      <Link to="/dashboard/image-gen" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group text-center">
                          <div className="w-12 h-12 mx-auto bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <ImageIcon size={24} />
                          </div>
                          <div className="font-bold text-gray-700 text-sm">مولد الصور</div>
                      </Link>
                      <Link to="/dashboard/seo" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group text-center">
                          <div className="w-12 h-12 mx-auto bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <Search size={24} />
                          </div>
                          <div className="font-bold text-gray-700 text-sm">محلل SEO</div>
                      </Link>
                      <Link to="/dashboard/ideas" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all group text-center">
                          <div className="w-12 h-12 mx-auto bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <Lightbulb size={24} />
                          </div>
                          <div className="font-bold text-gray-700 text-sm">أفكار محتوى</div>
                      </Link>
                  </div>
              </div>

          </div>

          {/* Sidebar Column: Updates & Activity */}
          <div className="space-y-8">
              
              {/* Creators Tips */}
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <Lightbulb size={18} /> نصائح للمبدعين
                  </h3>
                  <div className="space-y-4">
                      <Link to="/blog" className="block bg-white p-4 rounded-xl shadow-sm hover:shadow transition-all">
                          <h4 className="font-bold text-sm text-gray-800 mb-1 line-clamp-1">كيف تكتب برومبت (Prompt) احترافي؟</h4>
                          <p className="text-xs text-gray-500">تعلم أسرار التحدث مع الذكاء الاصطناعي...</p>
                      </Link>
                      <Link to="/blog" className="block bg-white p-4 rounded-xl shadow-sm hover:shadow transition-all">
                          <h4 className="font-bold text-sm text-gray-800 mb-1 line-clamp-1">زيادة أرباحك من التدوين</h4>
                          <p className="text-xs text-gray-500">استراتيجيات عملية لتحسين السيو...</p>
                      </Link>
                      <div className="text-center mt-2">
                          <Link to="/blog" className="text-xs font-bold text-indigo-600 hover:underline">زيارة المدونة التعليمية</Link>
                      </div>
                  </div>
              </div>

              {/* Recent Activity List (Real Data) */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[250px]">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">آخر الأعمال</h3>
                      <span className="text-xs text-gray-400">سجلك الشخصي</span>
                  </div>
                  <div className="space-y-4">
                      {activities.length > 0 ? (
                          activities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${getActivityColor(activity.type)}`}>
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm text-gray-800 truncate">{activity.title}</div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock size={10}/> {formatTime(activity.timestamp)}
                                    </div>
                                </div>
                                <span className="text-green-500 text-xs font-bold">تم</span>
                            </div>
                          ))
                      ) : (
                          <div className="text-center py-8 text-gray-400">
                              <Activity size={32} className="mx-auto mb-2 opacity-30"/>
                              <p className="text-sm">لم تقم بأي نشاط بعد.</p>
                              <p className="text-xs mt-1">جرب استخدام الأدوات!</p>
                          </div>
                      )}
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};

export default DashboardHome;
