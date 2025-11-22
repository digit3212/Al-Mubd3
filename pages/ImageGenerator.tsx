
import React, { useState } from 'react';
import { Image as ImageIcon, Download, RefreshCw, Layers, Sparkles } from 'lucide-react';
import { getImageUrl, translateToEnglish } from '../services/geminiService';
import { updateStats, logActivity } from '../services/storageService';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [style, setStyle] = useState('realistic');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState(42);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setImageSrc(null); 

    const newSeed = Math.floor(Math.random() * 1000000000);
    setSeed(newSeed);
    
    // Calculate Exact Dimensions
    let width = 1024;
    let height = 1024;
    if (aspectRatio === '16:9') { width = 1280; height = 720; }
    if (aspectRatio === '9:16') { width = 720; height = 1280; }
    if (aspectRatio === '4:3') { width = 1024; height = 768; }

    try {
        // 1. Translate
        let finalPrompt = prompt;
        try {
            const translated = await translateToEnglish(prompt);
            if (translated && translated.length > 0) {
                finalPrompt = translated;
            }
        } catch (transError) {
            console.log("Translation skipped");
        }

        // 2. Prompt Engineering
        switch (style) {
            case 'realistic':
                finalPrompt += ", photorealistic, 8k, highly detailed, sharp focus, dslr, cinematic lighting, hdr, masterpiece";
                break;
            case 'cinematic':
                finalPrompt += ", cinematic shot, movie scene, dramatic lighting, color graded, 8k, anamorphic lens, depth of field";
                break;
            case 'anime':
                finalPrompt += ", anime style, vibrant colors, detailed background, high quality, 4k, studio ghibli style, makoto shinkai";
                break;
            case '3d':
                finalPrompt += ", 3d render, unreal engine 5, ray tracing, highly detailed, global illumination, 8k, cgi, octane render";
                break;
            case 'digital-art':
                finalPrompt += ", digital painting, concept art, artstation, smooth, sharp lines, vivid colors, intricate details";
                break;
        }
        
        finalPrompt += " --no text, watermark, logo, blurry, deformed, ugly, extra fingers, bad anatomy, low quality";

        const url = getImageUrl(finalPrompt, width, height, newSeed, 'flux');
        
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageSrc(url);
            setLoading(false);
            // --- Log for Dashboard ---
            updateStats({ images: 1 });
            logActivity('image', prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''));
            // -------------------------
        };
        img.onerror = () => {
            console.warn("Flux model timeout/error, retrying with Turbo...");
            const fallbackUrl = getImageUrl(finalPrompt, width, height, newSeed, 'turbo');
            setImageSrc(fallbackUrl);
            setLoading(false);
             // Log even on fallback
             updateStats({ images: 1 });
             logActivity('image', prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''));
        };

    } catch (error) {
        console.error("Generation Error:", error);
        setLoading(false);
        alert("حدث خطأ غير متوقع.");
    }
  };

  const handleDownload = async () => {
      if (!imageSrc) return;
      
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `almubdi-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (e) {
          console.log("Download fallback used");
          window.open(imageSrc, '_blank');
      }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center md:text-right">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="p-2 bg-purple-100 text-purple-600 rounded-lg"><ImageIcon size={24} /></span>
          مولد الصور الخيالي
        </h1>
        <p className="text-gray-500">حول كلماتك إلى لوحات فنية مذهلة باستخدام الذكاء الاصطناعي.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">وصف الصورة (Prompt)</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px] text-sm"
                  placeholder="صف ما تتخيله بدقة... (مثال: قطة ترتدي بدلة فضاء في المريخ، إضاءة سينمائية)"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">الأبعاد</label>
                    <select 
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="1:1">مربع (1:1)</option>
                      <option value="16:9">عريض (16:9)</option>
                      <option value="9:16">طولي (9:16)</option>
                      <option value="4:3">قياسي (4:3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">النمط</label>
                    <select 
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="realistic">واقعي (Realistic)</option>
                      <option value="cinematic">سينمائي (Cinematic)</option>
                      <option value="anime">أنمي (Anime)</option>
                      <option value="3d">ثلاثي الأبعاد (3D)</option>
                      <option value="digital-art">رسم رقمي (Digital Art)</option>
                    </select>
                  </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
              >
                {loading ? <><RefreshCw className="animate-spin" /> جاري الرسم...</> : <><Sparkles size={20} /> توليد الصورة</>}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px] p-4 flex items-center justify-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
             
             {loading ? (
                 <div className="text-center animate-in fade-in duration-500">
                     <div className="relative w-24 h-24 mx-auto mb-6">
                         <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                     </div>
                     <h3 className="text-xl font-bold text-gray-800 animate-pulse">جاري إنشاء اللوحة...</h3>
                     <p className="text-gray-500 mt-2">نقوم بترجمة الوصف وتحسين التفاصيل...</p>
                 </div>
             ) : imageSrc ? (
                 <div className="relative w-full h-full flex flex-col items-center animate-in zoom-in-95 duration-500 group">
                     <img 
                        src={imageSrc} 
                        alt="Generated Art" 
                        className="max-w-full max-h-[550px] rounded-lg shadow-2xl object-contain" 
                     />
                     <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={handleDownload}
                            className="bg-white/90 backdrop-blur text-gray-800 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-white flex items-center gap-2 transition-colors"
                         >
                             <Download size={18} /> تحميل عالي الجودة
                         </button>
                     </div>
                 </div>
             ) : (
                 <div className="text-center text-gray-400 max-w-md">
                     <Layers size={80} className="mx-auto mb-6 opacity-20" />
                     <h3 className="text-xl font-bold text-gray-600 mb-2">مساحة الإبداع فارغة</h3>
                     <p>استخدم لوحة التحكم على اليمين لإدخال وصف الصورة وسيقوم الذكاء الاصطناعي برسمها.</p>
                 </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
