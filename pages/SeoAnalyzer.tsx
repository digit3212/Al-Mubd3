
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Loader2, BarChart, FileText } from 'lucide-react';
import { analyzeSeo } from '../services/geminiService';
import { updateStats, logActivity } from '../services/storageService';

const SeoAnalyzer = () => {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<{score: string, summary: string, good: string[], bad: string[]} | null>(null);
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !keyword) return;

    setLoading(true);
    setResult(null);
    
    // Local calculations
    setWordCount(text.trim().split(/\s+/).length);

    try {
      const analysisData = await analyzeSeo(text, keyword);
      setResult(analysisData);
      
      // --- Log for Dashboard ---
      updateStats({ seoCount: 1 });
      logActivity('seo', `تحليل: ${keyword}`);
      // -------------------------

    } catch (error) {
      console.error(error);
      alert("حدث خطأ في التحليل، تأكد من الاتصال بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="p-2 bg-green-100 text-green-600 rounded-lg"><Search size={24} /></span>
          محلل السيو (SEO)
        </h1>
        <p className="text-gray-500">افحص المحتوى الخاص بك وتأكد من تصدره لنتائج البحث.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الكلمة المفتاحية المستهدفة (Keyword)</label>
                  <input 
                    type="text" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="مثلاً: التسويق الرقمي"
                    required
                  />
              </div>
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">النص المراد تحليله</label>
                  <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none min-h-[200px]"
                    placeholder="ألصق المقال أو النص هنا..."
                    required
                  />
                  <div className="text-left text-xs text-gray-400 mt-2">
                      {text.length > 0 && `${text.length} حرف`}
                  </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-green-200"
              >
                  {loading ? <Loader2 className="animate-spin"/> : <BarChart size={20} />}
                  {loading ? 'جاري التحليل...' : 'تحليل النص'}
              </button>
          </form>
      </div>

      {result && (
          <div className="grid md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Score Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 md:col-span-1 text-center flex flex-col items-center justify-center">
                  <div className="text-gray-500 font-bold mb-4">النتيجة الكلية</div>
                  <div className={`w-32 h-32 rounded-full border-[8px] flex items-center justify-center text-4xl font-black shadow-inner transition-all ${parseInt(result.score) > 80 ? 'border-green-500 text-green-600' : parseInt(result.score) > 50 ? 'border-yellow-500 text-yellow-600' : 'border-red-500 text-red-600'}`}>
                      {result.score}
                  </div>
                  <div className="mt-4 text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                      {wordCount} كلمة
                  </div>
              </div>

              {/* Details */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 md:col-span-2">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <FileText size={18} className="text-gray-400"/> ملخص التقرير
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">{result.summary}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                      <div>
                          <h4 className="flex items-center gap-2 font-bold text-green-700 mb-3 text-sm uppercase tracking-wider">
                              <CheckCircle size={16} /> نقاط القوة
                          </h4>
                          <ul className="space-y-3">
                              {result.good && result.good.map((item, i) => (
                                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                      <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0 shadow-sm"></span>
                                      {item}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div>
                          <h4 className="flex items-center gap-2 font-bold text-red-700 mb-3 text-sm uppercase tracking-wider">
                              <XCircle size={16} /> تحسينات مطلوبة
                          </h4>
                           <ul className="space-y-3">
                              {result.bad && result.bad.map((item, i) => (
                                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                      <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full shrink-0 shadow-sm"></span>
                                      {item}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default SeoAnalyzer;
