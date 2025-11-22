
import React, { useState } from 'react';
import { PenTool, Loader2, Copy, CheckCircle, Globe, FileText } from 'lucide-react';
import { generateArticle } from '../services/geminiService';
import { updateStats, logActivity } from '../services/storageService';

const ArticleWriter = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [language, setLanguage] = useState('Arabic');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      const content = await generateArticle(topic, tone, length, language);
      setResult(content);
      
      // --- Log for Dashboard ---
      // Estimate word count from HTML content (approx)
      const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
      updateStats({ words: wordCount });
      logActivity('article', topic);
      // -------------------------

    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSwitch = async (newLang: string) => {
      if (language === newLang) return;
      setLanguage(newLang);

      // If we have a topic, regenerate immediately with new language
      if (topic.trim()) {
          setLoading(true);
          setError('');
          
          try {
              const content = await generateArticle(topic, tone, length, newLang);
              setResult(content);
              // Log regeneration as activity? Optional. 
          } catch (err) {
              setError('حدث خطأ أثناء تغيير اللغة.');
          } finally {
              setLoading(false);
          }
      }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><PenTool size={24} /></span>
          كاتب المقالات الذكي
        </h1>
        <p className="text-gray-500">أنشئ مقالات كاملة واحترافية في ثوانٍ معدودة.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">عنوان أو موضوع المقال</label>
                <textarea 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                  placeholder="مثلاً: فوائد الذكاء الاصطناعي في التعليم..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">اللغة</label>
                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                    <button 
                        type="button" 
                        onClick={() => handleLanguageSwitch('Arabic')}
                        disabled={loading}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${language === 'Arabic' ? 'bg-white shadow text-primary' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        العربية
                    </button>
                    <button 
                        type="button" 
                        onClick={() => handleLanguageSwitch('English')}
                        disabled={loading}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${language === 'English' ? 'bg-white shadow text-primary' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        English
                    </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">نبرة الكتابة</label>
                    <select 
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="professional">احترافي</option>
                      <option value="casual">ودي/بسيط</option>
                      <option value="academic">أكاديمي</option>
                      <option value="creative">إبداعي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">الطول</label>
                    <select 
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="short">قصير</option>
                      <option value="medium">متوسط</option>
                      <option value="long">طويل</option>
                    </select>
                  </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <><Loader2 className="animate-spin" /> جاري الكتابة...</> : 'توليد المقال'}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <span className="font-bold text-gray-600 text-sm flex items-center gap-2">
                  <FileText size={16}/> النتيجة
              </span>
              {result && (
                <button 
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm transition-colors"
                >
                  {copied ? <CheckCircle size={16} className="text-green-500"/> : <Copy size={16} />}
                  {copied ? 'تم النسخ' : 'نسخ النص'}
                </button>
              )}
            </div>
            <div className="p-8 flex-grow" dir={language === 'English' ? 'ltr' : 'rtl'}>
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                  <Loader2 size={48} className="animate-spin text-primary" />
                  <p className="animate-pulse font-medium">
                      {language === 'English' ? 'Generating article in English...' : 'الذكاء الاصطناعي يكتب مقالك الآن...'}
                  </p>
                  <p className="text-xs text-gray-400">قد يستغرق الأمر بضع ثوانٍ</p>
                </div>
              ) : result ? (
                <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-600 prose-a:text-blue-600 font-sans" dangerouslySetInnerHTML={{ __html: result }} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                  <PenTool size={64} className="mb-4 opacity-20" />
                  <p>أدخل الموضوع واضغط على توليد للبدء</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleWriter;
