import React from 'react';
import { Shield, FileText, Info, Mail, Users, Github, Twitter, Linkedin, Globe, MapPin, Phone } from 'lucide-react';

const PageHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
      <Icon size={28} />
    </div>
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
  </div>
);

const ContentBox = ({ children }: { children?: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed space-y-6">
    {children}
  </div>
);

export const About = () => {
  // 5 Empty Placeholders for real team data
  const team = Array(5).fill({
      name: "اسم العضو (فارغ)",
      role: "المسمى الوظيفي",
      image: "https://placehold.co/400x400/f1f5f9/94a3b8?text=Available+Slot"
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-primary rounded-3xl p-12 text-center text-white mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <Info className="w-16 h-16 mx-auto mb-6 opacity-80 relative z-10" />
        <h1 className="text-4xl font-bold mb-4 relative z-10">من نحن</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto relative z-10">
          نحن منصة "المبدع"، وجهتك الأولى صناعة المحتوى العربي باستخدام أحدث تقنيات الذكاء الاصطناعي.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-sm">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">أن نكون المنصة الرائدة في الشرق الأوسط التي تجمع بين الإبداع البشري وقوة الذكاء الاصطناعي، لنبني مجتمعاً من الكتاب والمصممين المحترفين.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-sm">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">رسالتنا</h3>
              <p className="text-gray-600 leading-relaxed">نسعى لتبسيط عملية إنشاء المحتوى الرقمي للمبدعين العرب، من خلال توفير أدوات ذكية تختصر الوقت والجهد، وتساعد في إنتاج محتوى عالي الجودة ينافس عالمياً.</p>
          </div>
      </div>
  
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">لماذا تختار منصة المبدع؟</h2>
          <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Globe size={32} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mb-3">دعم كامل للغة العربية</h4>
                  <p className="text-gray-500 leading-relaxed">نفهم تعقيدات لغتنا الجميلة، لذا تم تصميم خوارزمياتنا لتوليد نصوص عربية فصحى دقيقة ومترابطة.</p>
              </div>
              <div className="text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Shield size={32} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mb-3">أدوات شاملة</h4>
                  <p className="text-gray-500 leading-relaxed">من كتابة المقالات إلى تصميم الصور وتحليل SEO، نوفر لك كل ما تحتاجه في لوحة تحكم واحدة.</p>
              </div>
               <div className="text-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                    <Users size={32} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mb-3">مجتمع متفاعل</h4>
                  <p className="text-gray-500 leading-relaxed">لسنا مجرد أداة، بل مجتمع يضم آلاف المبدعين الذين يشاركون خبراتهم وأعمالهم يومياً.</p>
              </div>
          </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <div className="text-center mb-12">
            <span className="text-secondary font-bold text-sm uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">فريقنا</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-3">فريق العمل</h2>
            <p className="text-gray-500 mt-2">أماكن مخصصة لفريق العمل المستقبلي</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group text-center border-dashed border-2 border-gray-200">
                    <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img 
                            src={member.image} 
                            alt="Placeholder" 
                            className="opacity-50 w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-400 mb-1">{member.name} #{index + 1}</h3>
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-wide">{member.role}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Real Location Section */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row mb-12">
          <div className="md:w-1/2 relative min-h-[300px]">
              <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our Office" 
                  className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                   <div className="text-center text-white p-6">
                       <MapPin size={48} className="mx-auto mb-4 text-secondary" />
                       <h3 className="text-2xl font-bold">مقرنا الرئيسي</h3>
                       <p className="opacity-80">نعمل من قلب الإسكندرية</p>
                   </div>
              </div>
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">تفضل بزيارتنا</h3>
              <div className="space-y-6">
                  <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                          <MapPin size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-800 mb-1">العنوان</h4>
                          <p className="text-gray-600 leading-relaxed">
                              طريق الحرية - برج جروبسا<br/>
                              الطابق الخامس - مكتب 75<br/>
                              الاسكندرية - جمهورية مصر العربية
                          </p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                          <Phone size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-800 mb-1">الهاتف</h4>
                          <p className="text-gray-600" dir="ltr">00201096970009</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export const Privacy = () => (
  <div className="max-w-4xl mx-auto p-6">
    <PageHeader title="سياسة الخصوصية" icon={Shield} />
    <ContentBox>
      <p>نحن في منصة <strong>المبدع</strong> نولي اهتماماً كبيراً لخصوصية زوارنا ومستخدمينا. توضح هذه الوثيقة أنواع المعلومات الشخصية التي نجمعها وكيفية استخدامها.</p>
      
      <h3 className="text-xl font-bold text-gray-800 mt-4">ملفات الدخول (Log Files)</h3>
      <p>مثل الكثير من المواقع على شبكة الانترنت، يستخدم موقع المبدع ملفات الدخول. المعلومات داخل ملفات الدخول تشمل: بروتوكول الإنترنت، وعناوين (IP)، نوع المتصفح، مزود الخدمة (ISP)، التاريخ / خواتم الوقت، مصادر الزيارات / الخروج الصفحات، وعدد النقرات لتحليل الاتجاهات وإدارة الموقع ومراقبة المستخدم أثناء التنقل في جميع أنحاء الموقع، وجمع المعلومات الديموغرافية.</p>
      
      <h3 className="text-xl font-bold text-gray-800 mt-4">الكوكيز وإعدادات الشبكة</h3>
      <p>نحن نستخدم الكوكيز لتخزين المعلومات عن تفضيلات الزوار، وتواريخ محددة للمستخدم وتسجيل المعلومات عن الصفحات التي يصل إليها أو يزورها.</p>

      <h3 className="text-xl font-bold text-gray-800 mt-4">DoubleClick DART Cookie</h3>
      <ul className="list-disc list-inside space-y-2 mr-4">
          <li>جوجل، كبائع لطرف ثالث، يستعمل الكوكيز لخدمة الإعلانات على موقعنا.</li>
          <li>استخدام جوجل للكوكيز DART يمهد لخدمة الإعلانات للمستخدمين بناء على زيارة المواقع وغيرها من المواقع على شبكة الإنترنت.</li>
          <li>يجوز للمستخدمين اختيار عدم استخدام الكوكيز DART عن طريق زيارة سياسة الخصوصية الخاصة بإعلانات جوجل وشبكة المحتوى.</li>
      </ul>

       <h3 className="text-xl font-bold text-gray-800 mt-4">اتصل بنا</h3>
       <p>إذا كان لديك أي استفسار حول سياسة الخصوصية، لا تتردد في الاتصال بنا عبر صفحة اتصل بنا.</p>
    </ContentBox>
  </div>
);

export const Terms = () => (
  <div className="max-w-4xl mx-auto p-6">
    <PageHeader title="شروط الاستخدام" icon={FileText} />
    <ContentBox>
      <p>مرحباً بك في منصة <strong>المبدع</strong>. باستخادمك لهذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية.</p>

      <h3 className="text-xl font-bold text-gray-800 mt-4">1. قبول الشروط</h3>
      <p>من خلال الوصول إلى هذا الموقع واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بالشروط، فلا يجوز لك الوصول إلى الموقع أو استخدامه.</p>

      <h3 className="text-xl font-bold text-gray-800 mt-4">2. استخدام الخدمات</h3>
      <p>تُقدم خدمات "المبدع" (بما في ذلك أدوات الذكاء الاصطناعي) "كما هي". نحن لا نضمن دقة أو اكتمال المحتوى المولد بواسطة الذكاء الاصطناعي. يتحمل المستخدم المسؤولية الكاملة عن مراجعة واستخدام المحتوى الناتج.</p>

      <h3 className="text-xl font-bold text-gray-800 mt-4">3. حقوق الملكية الفكرية</h3>
      <p>جميع المحتويات والعلامات التجارية والبيانات الموجودة على هذا الموقع هي ملك لمنصة المبدع أو المرخصين لها، وهي محمية بموجب قوانين حقوق النشر والعلامات التجارية.</p>

      <h3 className="text-xl font-bold text-gray-800 mt-4">4. سلوك المستخدم</h3>
      <p>يوافق المستخدم على عدم استخدام الموقع لأي غرض غير قانوني أو محظور. يمنع استخدام أدواتنا لتوليد محتوى يحض على الكراهية، العنف، أو ينتهك حقوق الآخرين.</p>
      
      <h3 className="text-xl font-bold text-gray-800 mt-4">5. التعديلات</h3>
      <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستكون التغييرات فعالة فور نشرها على الموقع. استمرارك في استخدام الموقع بعد نشر التغييرات يعني قبولك لهذه التعديلات.</p>

       <h3 className="text-xl font-bold text-gray-800 mt-4">6. إخلاء المسؤولية</h3>
      <p>لا تتحمل منصة المبدع أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام أو عدم القدرة على استخدام الموقع.</p>
    </ContentBox>
  </div>
);

export const Contact = () => (
  <div className="max-w-4xl mx-auto p-6">
    <PageHeader title="اتصل بنا" icon={Mail} />
    <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">أرسل لنا رسالة</h3>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                    <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary" placeholder="أدخل اسمك" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary" placeholder="example@mail.com" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                    <textarea rows={4} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">إرسال الرسالة</button>
            </form>
        </div>
         <div className="bg-primary text-white p-8 rounded-2xl shadow-sm flex flex-col justify-between">
             <div>
                <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
                <p className="mb-6 opacity-90">فريق الدعم لدينا متاح لمساعدتك طوال أيام الأسبوع.</p>
                <div className="space-y-6">
                    <div className="flex items-start gap-3">
                        <MapPin size={20} className="shrink-0 mt-1" />
                        <span className="leading-relaxed">طريق الحرية - برج جروبسا - الطابق الخامس - مكتب 75 - الاسكندرية - جمهورية مصر العربية</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={20} className="shrink-0" />
                        <span dir="ltr">00201096970009</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail size={20} className="shrink-0" />
                        <span>digit3212@gmail.com</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Mail size={20} className="shrink-0" />
                        <span>support@almubdi.com</span>
                    </div>
                </div>
             </div>
             <div className="mt-8 pt-8 border-t border-white/10">
                 <p className="text-sm opacity-75">ساعات العمل: 9 صباحاً - 6 مساءً بتوقيت القاهرة</p>
             </div>
        </div>
    </div>
  </div>
);