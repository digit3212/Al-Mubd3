
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        setError('يرجى ملء جميع الحقول');
        return;
    }

    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء التسجيل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="mb-8 flex items-center gap-2 font-black text-3xl text-primary cursor-pointer" onClick={() => navigate('/')}>
        <Layers size={40} className="text-secondary" />
        <span>المبدع</span>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h2>
          <p className="text-gray-500">انضم إلى مجتمع المبدعين اليوم</p>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle size={16} /> {error}
            </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="الاسم الكامل"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 mt-4 flex items-center justify-center disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'إنشاء حساب'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          لديك حساب بالفعل؟ <Link to="/login" className="text-primary font-bold hover:underline">تسجيل الدخول</Link>
        </div>
      </div>
      
      <div className="mt-8 text-gray-400 text-sm">
        <Link to="/" className="flex items-center gap-2 hover:text-gray-600 transition-colors">
           <ArrowRight size={16} /> العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
