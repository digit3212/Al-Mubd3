
import React, { useState } from 'react';
import { Lightbulb, Loader2, Youtube, Instagram, Facebook, FileText, Check, Users } from 'lucide-react';
import { generateContentIdeas } from '../services/geminiService';
import { updateStats, logActivity } from '../services/storageService';

interface Idea {
  title: string;
  description: string;
  difficulty: string;
}

const ContentIdeas = () => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [audience, setAudience] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;

    setLoading(true);
    setIdeas([]);

    try {
      const jsonString = await generateContentIdeas(niche, platform, audience);
      const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedIdeas = JSON.parse(cleanJson);
      setIdeas(parsedIdeas);

      // --- Log for Dashboard ---
      updateStats({ ideasCount: 1 });
      logActivity('idea', `أفكار: ${niche}`);
      // -------------------------

    } catch (error) {
      console.error("Parse Error", error);
      alert("حدث خطأ في توليد الأفكار، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><Lightbulb size={24} /></span>
          مولد أفكار المحتوى
        </h1>
        <p className="text-gray-500">هل تعاني من قفلة المبدع؟ احصل على أفكار فيرال (Viral) في ثوانٍ.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">المجال (Niche)</label>
                  <input 
                    type="text" 
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                    placeholder="مثلاً: الطبخ، التقنية، السفر..."
                    required
                  />
              </div>
              
              <div className="w-full md:w-1/4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">الجمهور المستهدف</label>
                  <input 
                    type="text" 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                    placeholder="مثلاً: مبتدئين، طلاب..."
                  />
              </div>

              <div className="w-full md:w-1/4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">المنصة</label>
                  <select 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none bg-white"
                  >
                      <option value="YouTube">يوتيوب (YouTube)</option>
                      <option value="Instagram">انستجرام (Instagram)</option>
                      <option value="TikTok">تيك توك (TikTok)</option>
                      <option value="Blog">مدونة (Blog Article)</option>
                      <option value="LinkedIn">لينكد إن (LinkedIn)</option>
                      <option value="Twitter">تويتر (X)</option>
                  </select>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-4 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-yellow-200 h-[58px]"
              >
                  {loading ? <Loader2 className="animate-spin"/> : <Lightbulb size={20} />}
                  {loading ? '...' : 'توليد'}
              </button>
          </form>
      </div>

      {ideas.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
              {ideas.map((idea, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                      <div className="flex justify-between items-start mb-4">
                          <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              idea.difficulty === 'Easy' ? 'bg-green-100 text-green-600' : 
                              idea.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                          }`}>
                              {idea.difficulty === 'Easy' ? 'سهل التنفيذ' : idea.difficulty === 'Medium' ? 'متوسط' : 'متقدم'}
                          </div>
                          <div className="text-gray-300 text-xl font-black opacity-20">#{index + 1}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">{idea.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{idea.description}</p>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default ContentIdeas;
