import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Search, Image as ImageIcon, ArrowRight, Globe, LogIn, Layers, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer'; // Imported Footer to include it on Landing Page

const translations = {
  ar: {
    nav: {
      login: "تسجيل الدخول",
      lang: "English"
    },
    hero: {
      titlePrefix: "أطلق العنان لإبداعك مع",
      brand: "المبدع",
      desc: "المنصة العربية الأولى الشاملة لصناعة المحتوى باستخدام الذكاء الاصطناعي. نساعدك على كتابة\nالمقالات، تصميم الصور، وتحليل السيو في مكان واحد وبدون خبرة مسبقة.",
      browse: "تصفح أعمال المجتمع",
      start: "ابدأ الاستخدام مجاناً",
      noCredit: "✨ لا يحتاج لبطاقة ائتمان",
      freeTrial: "🚀 تجربة مجانية فورية"
    },
    features: {
      title: "أدوات احترافية بين يديك",
      desc: "وفرنا لك مجموعة متكاملة من الأدوات التي تغنيك عن الاشتراك في عدة مواقع. كل ما تحتاجه للنجاح الرقمي موجود هنا.",
      writer: {
        title: "كاتب المقالات الذكي",
        desc: "انس عناء الكتابة اليدوية. بضغطة زر واحدة، يمكنك توليد مقالات حصرية متوافقة مع معايير السيو (SEO) باللغة العربية الفصحى، جاهزة للنشر فوراً في مدونتك."
      },
      image: {
        title: "مصمم الصور الخيالي",
        desc: "حول أفكارك وكلماتك إلى صور بصرية مذهلة. سواء كنت تحتاج صوراً للمقالات، أو منشورات للسوشيال ميديا، الذكاء الاصطناعي سيرسم ما في خيالك بدقة."
      },
      seo: {
        title: "محلل السيو (SEO)",
        desc: "تأكد من تصدر مقالاتك لنتائج البحث. نقوم بتحليل النص، واقتراح الكلمات المفتاحية، وتحسين بنية المقال لضمان الوصول لأكبر عدد من الزوار."
      }
    },
    stats: {
      articles: "مقال تم توليده",
      images: "صورة مصممة",
      users: "مستخدم نشط",
      uptime: "متاح دائماً"
    },
    how: {
      title: "كيف يعمل الموقع؟",
      step1: { title: "اختر الأداة المناسبة", desc: "حدد ما تريد إنشاءه، سواء كان مقالاً، صورة، أو فكرة جديدة." },
      step2: { title: "أدخل الوصف", desc: "اكتب وصفاً بسيطاً لما يدور في ذهنك، وسيقوم الذكاء الاصطناعي بفهم السياق." },
      step3: { title: "احصل على النتيجة", desc: "في ثوانٍ معدودة، ستحصل على محتوى احترافي جاهز للاستخدام والتحميل." }
    },
    faq: {
      title: "الأسئلة الشائعة",
      desc: "إجابات على أكثر الأسئلة شيوعاً حول استخدام أدوات منصة المبدع والذكاء الاصطناعي.",
      q1: "هل المحتوى المولد حصري ومتوافق مع SEO؟",
      a1: "نعم، خوارزمياتنا مصممة لتوليد محتوى فريد وغير منسوخ. نحن نستخدم أفضل ممارسات تحسين محركات البحث (SEO) لضمان أن المقالات تحتوي على الهيكل المناسب والكلمات المفتاحية التي تساعد في تصدر نتائج البحث.",
      q2: "هل يمكنني استخدام الصور المولدة تجارياً؟",
      a2: "بالتأكيد. الصور التي يتم إنشاؤها بواسطة أدواتنا خالية من حقوق الملكية الفكرية التقليدية، مما يمنحك الحرية الكاملة لاستخدامها في مشاريعك التجارية، مدوناتك، أو حملاتك الإعلانية دون أي مخاوف قانونية.",
      q3: "كيف يعمل نظام تحليل السيو؟",
      a3: "يقوم النظام بفحص النص الخاص بك ومقارنته بمعايير جوجل الحديثة. نتحقق من كثافة الكلمات المفتاحية، سهولة القراءة، طول الجمل، واستخدام العناوين الفرعية، ثم نقدم لك تقريراً مفصلاً مع نصائح للتحسين.",
      q4: "هل الخدمة مجانية؟",
      a4: "نقدم خطة مجانية تتيح لك تجربة جميع الأدوات بشكل يومي محدود. للمستخدمين المحترفين وأصحاب المواقع الكبيرة، نوفر خططاً مدفوعة تمنح وصولاً غير محدود وميزات متقدمة وسرعة أعلى في التوليد."
    }
  },
  en: {
    nav: {
      login: "Log In",
      lang: "العربية"
    },
    hero: {
      titlePrefix: "Unleash Your Creativity with",
      brand: "Al-Mubdi",
      desc: "The first comprehensive Arab platform for content creation using AI. We help you generate articles, design images, and analyze SEO all in one place without prior experience.",
      browse: "Browse Community",
      start: "Start for Free",
      noCredit: "✨ No Credit Card Required",
      freeTrial: "🚀 Instant Free Trial"
    },
    features: {
      title: "Professional Tools at Your Fingertips",
      desc: "We provide a complete set of tools that save you from subscribing to multiple sites. Everything you need for digital success is here.",
      writer: {
        title: "Smart Article Writer",
        desc: "Forget manual writing. With one click, generate exclusive SEO-friendly articles in formal Arabic, ready for publishing on your blog immediately."
      },
      image: {
        title: "Imaginative Image Designer",
        desc: "Turn your ideas and words into stunning visuals. Whether you need images for articles or social media posts, AI will draw what's in your imagination accurately."
      },
      seo: {
        title: "SEO Analyzer",
        desc: "Ensure your articles top search results. We analyze text, suggest keywords, and optimize structure to guarantee reaching the maximum number of visitors."
      }
    },
    stats: {
      articles: "Articles Generated",
      images: "Images Designed",
      users: "Active Users",
      uptime: "Always Available"
    },
    how: {
      title: "How It Works?",
      step1: { title: "Choose the Right Tool", desc: "Select what you want to create, be it an article, an image, or a new idea." },
      step2: { title: "Enter Description", desc: "Write a simple description of what's on your mind, and the AI will understand the context." },
      step3: { title: "Get Results", desc: "In mere seconds, you'll get professional content ready for use and download." }
    },
    faq: {
      title: "FAQ",
      desc: "Everything you need to know about Al-Mubdi platform",
      q1: "Is generated content exclusive and SEO friendly?",
      a1: "Yes, our algorithms are designed to generate unique content. We use SEO best practices to ensure articles have proper structure and keywords to help rank in search results.",
      q2: "Can I use generated images commercially?",
      a2: "Absolutely. Images generated by our tools are free from traditional copyright restrictions, giving you full freedom to use them in commercial projects, blogs, or ad campaigns.",
      q3: "How does the SEO analysis work?",
      a3: "The system scans your text against modern Google standards. We check keyword density, readability, sentence length, and subheading usage, then provide a detailed report with improvement tips.",
      q4: "Is the service free?",
      a4: "We offer a free plan allowing daily limited access. For professionals and large site owners, we offer paid plans with unlimited access, advanced features, and faster generation."
    }
  }
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'ar';
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
    document.title = isEnglish ? "Al-Mubdi | The #1 Arab AI Platform" : "المبدع | المنصة العربية الأولى للذكاء الاصطناعي";
  }, [isEnglish]);

  const t = isEnglish ? translations.en : translations.ar;

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div className={`min-h-screen font-sans bg-white ${isEnglish ? 'font-sans' : 'font-sans'}`}>
      
      {/* Combined Header Section (Navbar + Hero) */}
      <header className="relative bg-[#312B8B] overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        
        {/* Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#312B8B] via-[#2a2475] to-[#1e185d] opacity-90 pointer-events-none"></div>

        {/* Navbar Overlay */}
        <nav className="relative z-50 pt-6 px-6">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 font-black text-2xl text-white cursor-pointer" onClick={() => navigate('/')}>
                    <Layers size={36} className="text-secondary" />
                    <span>{t.hero.brand}</span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-4">
                     {/* Login Button */}
                    <Link 
                       to="/login" 
                       className="flex items-center gap-2 px-4 py-2 text-white font-bold hover:text-secondary transition-all"
                    >
                       <LogIn size={20} />
                       <span>{t.nav.login}</span>
                    </Link>

                    {/* Language Toggle */}
                    <button 
                      onClick={toggleLanguage}
                      className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all"
                    >
                      <Globe size={20} />
                      <span className="font-medium">{t.nav.lang}</span>
                    </button>
                </div>
            </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-6 py-8 md:py-12 relative z-10 text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                {t.hero.titlePrefix} <br/>
                <span className="text-secondary inline-block mt-4">{t.hero.brand}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 font-light leading-relaxed opacity-90 whitespace-pre-line">
                {t.hero.desc}
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto">
                {/* Primary Action (Yellow - Right in RTL) */}
                <button onClick={() => navigate('/dashboard')} className="w-full md:w-auto px-8 py-4 bg-secondary text-primary-dark text-lg font-bold rounded-xl hover:bg-secondary-hover transition-all transform hover:scale-105 shadow-xl shadow-secondary/20 flex items-center justify-center gap-2">
                   {t.hero.start} <ArrowRight size={20} className={isEnglish ? "" : "rotate-180"}/>
                </button>

                {/* Secondary Action (Blue - Left in RTL) */}
                <button onClick={() => navigate('/dashboard/community')} className="w-full md:w-auto px-8 py-4 bg-[#453F99] hover:bg-[#5049ad] text-white text-lg font-bold rounded-xl transition-all shadow-lg border border-white/10">
                   {t.hero.browse}
                </button>
            </div>
            
            <div className="mt-10 text-sm text-indigo-200 font-medium flex justify-center gap-6">
                <span>{t.hero.noCredit}</span>
                <span>{t.hero.freeTrial}</span>
            </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t.features.desc}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                          <PenTool size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{t.features.writer.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{t.features.writer.desc}</p>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                       <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                          <ImageIcon size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{t.features.image.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{t.features.image.desc}</p>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                       <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                          <Search size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{t.features.seo.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{t.features.seo.desc}</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="container mx-auto px-6 relative z-10">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                   <div>
                       <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">10,000+</div>
                       <div className="text-gray-300">{t.stats.articles}</div>
                   </div>
                   <div>
                       <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">5,000+</div>
                       <div className="text-gray-300">{t.stats.images}</div>
                   </div>
                   <div>
                       <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">2,000+</div>
                       <div className="text-gray-300">{t.stats.users}</div>
                   </div>
                   <div>
                       <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">24/7</div>
                       <div className="text-gray-300">{t.stats.uptime}</div>
                   </div>
               </div>
           </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
           <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row items-center gap-16">
                   <div className="md:w-1/2 text-right"> {/* Explicitly set text-right for RTL */}
                        <div className="relative rounded-3xl shadow-2xl border-8 border-white overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl transform rotate-3 blur-xl opacity-50 z-0"></div>
                           <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="Dashboard Preview" 
                            className="relative z-10 w-full"
                           />
                       </div>
                   </div>
                   <div className="md:w-1/2">
                       <h2 className="text-4xl font-bold text-gray-900 mb-12 ltr:text-left rtl:text-right">{t.how.title}</h2>
                       
                       <div className="space-y-8">
                           <div className="flex gap-6">
                               <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-blue-200">1</div>
                               <div>
                                   <h3 className="text-xl font-bold mb-2">{t.how.step1.title}</h3>
                                   <p className="text-gray-600">{t.how.step1.desc}</p>
                               </div>
                           </div>
                           <div className="flex gap-6">
                               <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-blue-200">2</div>
                               <div>
                                   <h3 className="text-xl font-bold mb-2">{t.how.step2.title}</h3>
                                   <p className="text-gray-600">{t.how.step2.desc}</p>
                               </div>
                           </div>
                           <div className="flex gap-6">
                               <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-blue-200">3</div>
                               <div>
                                   <h3 className="text-xl font-bold mb-2">{t.how.step3.title}</h3>
                                   <p className="text-gray-600">{t.how.step3.desc}</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
      </section>

      {/* FAQ Section - Static Cards */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-16">
                  <div className="inline-flex items-center justify-center gap-2 mb-4">
                      <h2 className="text-3xl font-bold text-gray-900">{t.faq.title}</h2>
                      <HelpCircle size={32} className="text-primary" />
                  </div>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.faq.desc}</p>
              </div>

              <div className="space-y-6">
                  <FaqItem 
                    question={t.faq.q1}
                    answer={t.faq.a1}
                  />
                   <FaqItem 
                    question={t.faq.q2}
                    answer={t.faq.a2}
                  />
                   <FaqItem 
                    question={t.faq.q3}
                    answer={t.faq.a3}
                  />
                   <FaqItem 
                    question={t.faq.q4}
                    answer={t.faq.a4}
                  />
              </div>
          </div>
      </section>

      <Footer isEnglish={isEnglish} />
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-3 ltr:text-left rtl:text-right">{question}</h3>
            <p className="text-gray-600 leading-relaxed ltr:text-left rtl:text-right">{answer}</p>
        </div>
    );
}

export default LandingPage;