
import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, BookOpen, Clock, Share2, X, CheckCircle, Mail, Tag } from 'lucide-react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
}

const articles: BlogPost[] = [
    {
        id: 1,
        title: "كيف يغير الذكاء الاصطناعي مستقبل صناعة المحتوى؟",
        excerpt: "استكشف كيف تساعد أدوات الذكاء الاصطناعي الكتاب والمصممين في زيادة الإنتاجية وتحسين جودة العمل بدلاً من استبدالهم.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        author: "أحمد خليل",
        date: "15 مايو 2024",
        category: "تكنولوجيا",
        readTime: "5 دقائق",
        content: `
            <p class="lead text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                في السنوات الأخيرة، شهدنا ثورة تكنولوجية هائلة بفضل الذكاء الاصطناعي التوليدي (Generative AI). لم يعد الذكاء الاصطناعي مجرد خيال علمي، بل أصبح أداة يومية يستخدمها الملايين لصناعة المحتوى.
            </p>
            
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">هل سيستبدل الذكاء الاصطناعي المبدعين؟</h2>
            <p class="mb-6 text-gray-600 leading-loose">
                السؤال الأكثر تداولاً هو: "هل سأفقد وظيفتي لصالح روبوت؟". الإجابة المختصرة هي: <strong>لا، لكنك قد تفقدها لشخص يستخدم الذكاء الاصطناعي.</strong>
                الأدوات مثل ChatGPT و Midjourney ليست مصممة للعمل بمفردها، بل هي "مساعد طيار" (Co-pilot) يعزز قدراتك البشرية.
            </p>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">كيف تستفيد من هذه الثورة؟</h3>
            <ul class="list-disc list-inside space-y-3 text-gray-600 mb-6">
                <li><strong>توليد الأفكار:</strong> تخلص من "قفلة الكاتب" بطلب 10 أفكار للمقالات في ثوانٍ.</li>
                <li><strong>تحسين المسودات:</strong> استخدم AI لمراجعة القواعد النحوية واقتراح صياغات بديلة.</li>
                <li><strong>تلخيص الأبحاث:</strong> بدلاً من قراءة 50 صفحة، اطلب ملخصاً لأهم النقاط.</li>
            </ul>

            <img src="https://images.unsplash.com/photo-1535378437268-5f3a3170f863?auto=format&fit=crop&w=1000&q=80" class="w-full rounded-2xl my-8 shadow-lg" alt="AI Collaboration" />

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">مستقبل الكتابة والتصميم</h2>
            <p class="text-gray-600 leading-loose">
                نحن نتجه نحو عصر "الإبداع الهجين". حيث يكون دور الإنسان هو التوجيه، التعديل، وإضفاء اللمسة العاطفية، بينما يتولى الذكاء الاصطناعي المهام الروتينية والتنفيذ السريع.
            </p>
            
            <div class="bg-blue-50 p-6 rounded-xl border-r-4 border-blue-500 mt-8">
                <p class="font-bold text-blue-900">نصيحة للمبدعين:</p>
                <p class="text-blue-800">لا تحارب التكنولوجيا، بل تعلم كيف تروضها لتخدم رؤيتك الإبداعية.</p>
            </div>
        `
    },
    {
        id: 2,
        title: "أفضل 5 استراتيجيات لتحسين السيو (SEO) في 2024",
        excerpt: "دليل شامل لأصحاب المواقع للظهور في الصفحة الأولى من جوجل. تعرف على أهمية الكلمات المفتاحية وتجربة المستخدم.",
        image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=1000&auto=format&fit=crop",
        author: "سارة علي",
        date: "12 مايو 2024",
        category: "تسويق",
        readTime: "8 دقائق",
        content: `
            <p class="lead text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                تتغير خوارزميات جوجل باستمرار، وما كان يعمل في 2020 قد يضر موقعك اليوم. إليك أهم الاستراتيجيات التي يجب عليك التركيز عليها لتصدر نتائج البحث هذا العام.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. المحتوى المفيد أولاً (Helpful Content)</h2>
            <p class="mb-4 text-gray-600 leading-loose">
                جوجل الآن تعطي الأولوية للمحتوى المكتوب "بواسطة البشر ولأجل البشر". تجنب حشو الكلمات المفتاحية وركز على إجابة أسئلة الباحث بدقة وشمولية.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. تجربة المستخدم (Core Web Vitals)</h2>
            <p class="mb-4 text-gray-600 leading-loose">
                سرعة الموقع لم تعد رفاهية. تأكد من أن موقعك يحمل في أقل من 3 ثوانٍ، ومتوافق تماماً مع الهواتف المحمولة.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. البحث الصوتي (Voice Search)</h2>
            <p class="mb-6 text-gray-600 leading-loose">
                مع انتشار المساعدات الذكية مثل Siri و Alexa، أصبح الناس يبحثون بجمل كاملة. بدلاً من استهداف "مطعم بيتزا"، استهدف "ما هو أفضل مطعم بيتزا قريب مني؟".
            </p>

            <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80" class="w-full rounded-2xl my-8 shadow-lg" alt="SEO Analytics" />

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">قائمة التحقق السريعة:</h3>
            <ul class="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                <li>استخدم العناوين الفرعية (H2, H3) بذكاء.</li>
                <li>أضف وصفاً للصور (Alt Text).</li>
                <li>قم ببناء روابط داخلية (Internal Linking) بين مقالاتك.</li>
                <li>حدث المحتوى القديم بانتظام.</li>
            </ul>
        `
    },
    {
        id: 3,
        title: "فن هندسة الأوامر (Prompt Engineering) لتوليد صور مذهلة",
        excerpt: "كيف تكتب وصفاً دقيقاً لتحصل على صور خيالية من أدوات مثل Midjourney و DALL-E. نصائح للمبتدئين والمحترفين.",
        image: "https://images.unsplash.com/photo-1686191128892-3b371138d541?q=80&w=1000&auto=format&fit=crop",
        author: "كريم محمود",
        date: "10 مايو 2024",
        category: "تصميم",
        readTime: "6 دقائق",
        content: `
            <p class="lead text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                السر وراء الصور المذهلة التي تراها على الإنترنت ليس "السحر"، بل هو "الوصف الدقيق". هندسة الأوامر هي مهارة المستقبل التي يجب على كل مصمم تعلمها.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">المعادلة الذهبية للبرومبت (The Golden Formula)</h2>
            <p class="mb-4 text-gray-600 leading-loose">
                للحصول على أفضل نتيجة، اتبع هذا الهيكل في كتابة الأمر:
                <br/>
                <strong>[الموضوع] + [البيئة] + [الإضاءة] + [النمط الفني] + [الكاميرا/العدسة]</strong>
            </p>
            
            <div class="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm mb-6 dir-ltr" dir="ltr">
                Example: "A futuristic cyberpunk cat sitting on a neon roof, raining night, cinematic lighting, unreal engine 5 render, 8k resolution --ar 16:9"
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">كلمات سحرية ترفع الجودة</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li><strong>الإضاءة:</strong> Cinematic lighting, Golden hour, Volumetric lighting.</li>
                <li><strong>الدقة:</strong> 4k, 8k, Highly detailed, Sharp focus.</li>
                <li><strong>النمط:</strong> Photorealistic, Oil painting, Anime style, 3D render.</li>
            </ul>

            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80" class="w-full rounded-2xl my-8 shadow-lg" alt="AI Art" />

            <p class="text-gray-600 leading-loose">
                تذكر أن الذكاء الاصطناعي يحتاج إلى توجيه. كلما كنت أكثر تفصيلاً في وصفك، كلما كانت النتيجة أقرب لما في خيالك.
            </p>
        `
    },
    {
        id: 4,
        title: "الربح من الإنترنت باستخدام أدوات AI",
        excerpt: "طرق حقيقية ومجربة لتحقيق دخل إضافي من خلال تقديم خدمات الكتابة، التصميم، والترجمة بمساعدة الذكاء الاصطناعي.",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop",
        author: "محمد حسن",
        date: "08 مايو 2024",
        category: "أعمال",
        readTime: "4 دقائق",
        content: `
            <p class="lead text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                لم يعد الذكاء الاصطناعي مجرد أداة للعب، بل أصبح مصدراً للدخل للكثيرين. إليك 4 طرق عملية للبدء في كسب المال اليوم.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. بيع خدمات كتابة المقالات</h2>
            <p class="mb-4 text-gray-600 leading-loose">
                استخدم أدوات مثل "كاتب المقالات" في منصة المبدع لإنتاج مقالات عالية الجودة بسرعة، ثم قم ببيعها على مواقع العمل الحر مثل خمسات ومستقل.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. تصميم الصور والشعارات</h2>
            <p class="mb-4 text-gray-600 leading-loose">
                يمكنك استخدام مولد الصور لإنشاء تصاميم للسوشيال ميديا، أغلفة كتب، أو حتى صور لبيعها على مواقع الصور (Stock Photos).
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. إنشاء محتوى يوتيوب</h2>
            <p class="mb-6 text-gray-600 leading-loose">
                اطلب من الذكاء الاصطناعي كتابة سيناريو لفيديو، ثم استخدم أدوات توليد الصوت والصور لإنشاء فيديو كامل دون أن تظهر بوجهك (Faceless Channel).
            </p>
            
            <div class="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mt-6">
                <h4 class="font-bold text-yellow-800 mb-2">نقطة هامة:</h4>
                <p class="text-yellow-700 text-sm">
                    العميل يدفع مقابل "النتيجة" وليس "الأداة". تأكد دائماً من مراجعة المحتوى وتنقيحه بشرياً قبل تسليمه لضمان الجودة والاحترافية.
                </p>
            </div>
        `
    }
];

const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if(email) {
          setSubscribed(true);
          setTimeout(() => {
              setSubscribed(false);
              setEmail('');
          }, 3000);
      }
  };

  const handleShare = () => {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط المقال!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      
      {/* Header */}
      <div className="mb-16 text-center pt-10">
        <span className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 text-primary rounded-2xl mb-6 animate-in zoom-in duration-500">
            <BookOpen size={32} />
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">مدونة المبدع</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          مقالات حصرية، شروحات تقنية، ونصائح عملية لتطوير مهاراتك في عالم الذكاء الاصطناعي وصناعة المحتوى.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
        {articles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors z-10"></div>
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-lg flex items-center gap-1">
                <Tag size={12} /> {article.category}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-5 font-medium">
                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md"><Calendar size={14}/> {article.date}</span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md"><Clock size={14}/> {article.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center text-primary font-bold text-sm pt-4 border-t border-gray-50 mt-auto group/link">
                اقرأ المقال كاملاً <ArrowLeft size={18} className="mr-2 transition-transform group-hover/link:-translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-2xl border-x border-gray-100 relative">
                
                {/* Sticky Toolbar */}
                <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <button 
                        onClick={() => setSelectedArticle(null)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex items-center gap-2 font-bold text-sm"
                    >
                        <X size={20} /> إغلاق
                    </button>
                    <div className="flex items-center gap-2">
                         <button onClick={handleShare} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors" title="نسخ الرابط">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Article Content */}
                <div className="p-8 md:p-12 lg:p-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block px-4 py-1 bg-primary/5 text-primary rounded-full text-sm font-bold mb-6">
                            {selectedArticle.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                            {selectedArticle.title}
                        </h1>
                        
                        <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm border-y border-gray-100 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                                    <User size={20} />
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-gray-900">{selectedArticle.author}</div>
                                    <div className="text-xs">محرر محتوى</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} /> {selectedArticle.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} /> وقت القراءة: {selectedArticle.readTime}
                            </div>
                        </div>
                    </div>

                    <img 
                        src={selectedArticle.image} 
                        alt={selectedArticle.title} 
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl mb-12 shadow-xl"
                    />

                    <div 
                        className="prose prose-xl max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-img:rounded-2xl font-sans"
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    />

                    {/* Author Bio Box */}
                    <div className="bg-gray-50 rounded-2xl p-8 mt-16 flex items-center gap-6 border border-gray-100">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 shrink-0">
                            <User size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">كتب بواسطة: {selectedArticle.author}</h4>
                            <p className="text-sm text-gray-500">كاتب ومحرر متخصص في تقنيات الذكاء الاصطناعي. يشارك خبراته لمساعدة المبدعين العرب.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="mt-16 bg-[#0F172A] rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
                  <Mail size={32} className="text-secondary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">انضم لنشرتنا البريدية</h2>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                  احصل على أحدث المقالات، أدوات الذكاء الاصطناعي الجديدة، ونصائح حصرية لتطوير عملك مباشرة في بريدك الإلكتروني.
              </p>
              
              {subscribed ? (
                  <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2 font-bold animate-in fade-in zoom-in">
                      <CheckCircle size={20} /> شكراً لاشتراكك! تم تسجيل بريدك بنجاح.
                  </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="أدخل بريدك الإلكتروني" 
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 px-4 py-3 text-lg"
                        required
                    />
                    <button type="submit" className="bg-secondary hover:bg-secondary-hover text-primary-dark font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-secondary/20">
                        اشترك الآن
                    </button>
                </form>
              )}
              <p className="text-gray-500 text-xs mt-6">🔒 لا نرسل رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.</p>
          </div>
      </div>
    </div>
  );
};

export default BlogPage;
