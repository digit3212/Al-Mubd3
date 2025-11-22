import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="mb-8 flex items-center gap-2 font-black text-3xl text-primary cursor-pointer" onClick={() => navigate('/')}>
        <Layers size={40} className="text-secondary" />
        <span>المبدع</span>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">استعادة كلمة المرور</h2>
          <p className="text-gray-500">أدخل بريدك الإلكتروني لاستلام رابط إعادة التعيين</p>
        </div>
        
        {submitted ? (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-gray-500 mb-6">تحقق من بريدك الإلكتروني للحصول على التعليمات.</p>
                <Link to="/login" className="block w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">
                    العودة لتسجيل الدخول
                </Link>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input 
                type="email" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="name@example.com"
                required
                />
            </div>

            <button 
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
                إرسال الرابط
            </button>
            </form>
        )}

        {!submitted && (
             <div className="mt-6 text-center text-sm text-gray-500">
             تذكرت كلمة المرور؟ <Link to="/login" className="text-primary font-bold hover:underline">تسجيل الدخول</Link>
           </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;