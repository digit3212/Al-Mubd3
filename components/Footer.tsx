import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  isEnglish?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isEnglish = false }) => {
  const t = {
    ar: {
      brand: "المبدع",
      desc1: "منصتك الشاملة لصناعة المحتوى العربي.",
      desc2: "نؤمن بقوة الذكاء الاصطناعي",
      desc3: "في تمكين المبدعين العرب.",
      quickLinks: "روابط سريعة",
      links: {
        dashboard: "لوحة التحكم",
        blog: "المدونة",
        community: "مجتمع المبدعين",
        writer: "كاتب المقالات",
        imageGen: "مولد الصور",
        seo: "محلل SEO",
        ideas: "أفكار المحتوى",
      },
      legal: "قانوني",
      legalLinks: {
        privacy: "سياسة الخصوصية",
        terms: "شروط الاستخدام",
        about: "من نحن",
        contact: "اتصل بنا",
      },
      contactTitle: "معلومات التواصل الرسمي",
      address: "طريق الحرية - برج جروبسا - الطابق الخامس - مكتب 75 - الاسكندرية - جمهورية مصر العربية",
      copyright: "© 2024 منصة المبدع. جميع الحقوق محفوظة.",
      dev: "تم التطوير في مصر"
    },
    en: {
      brand: "Al-Mubdi",
      desc1: "Your comprehensive platform for Arabic content creation.",
      desc2: "We believe in the power of AI",
      desc3: "to empower Arab creators.",
      quickLinks: "Quick Links",
      links: {
        dashboard: "Dashboard",
        blog: "Blog",
        community: "Creators Community",
        writer: "Article Writer",
        imageGen: "Image Generator",
        seo: "SEO Analyzer",
        ideas: "Content Ideas",
      },
      legal: "Legal",
      legalLinks: {
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        about: "About Us",
        contact: "Contact Us",
      },
      contactTitle: "Official Contact Info",
      address: "Horreya Road - Groupsa Tower - 5th Floor - Office 75 - Alexandria - Egypt",
      copyright: "© 2024 Al-Mubdi Platform. All rights reserved.",
      dev: "Developed in Egypt"
    }
  };

  const content = isEnglish ? t.en : t.ar;

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-black text-2xl mb-6">
              <Layers className="text-secondary" size={32} />
              <span>{content.brand}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {content.desc1}<br />
              {content.desc2}<br />
              {content.desc3}
            </p>
            <div className="flex gap-4">
                {/* Social Icons Placeholders */}
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">in</div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">t</div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">f</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">{content.quickLinks}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">{content.links.dashboard}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">{content.links.blog}</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">{content.links.community}</Link></li>
              <li><Link to="/dashboard/writer" className="hover:text-white transition-colors">{content.links.writer}</Link></li>
              <li><Link to="/dashboard/image-gen" className="hover:text-white transition-colors">{content.links.imageGen}</Link></li>
              <li><Link to="/dashboard/seo" className="hover:text-white transition-colors">{content.links.seo}</Link></li>
              <li><Link to="/dashboard/ideas" className="hover:text-white transition-colors">{content.links.ideas}</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6">{content.legal}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white transition-colors">{content.legalLinks.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">{content.legalLinks.terms}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{content.legalLinks.about}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{content.legalLinks.contact}</Link></li>
            </ul>
          </div>

           {/* Column 4: Contact */}
           <div>
            <h3 className="font-bold text-lg mb-6">{content.contactTitle}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-primary-light shrink-0" />
                <span className="leading-relaxed">{content.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-light shrink-0" />
                <span dir="ltr">00201096970009</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-light shrink-0" />
                <span>digit3212@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
           <span>{content.copyright}</span>
           <div className="flex items-center gap-1 mt-2 md:mt-0">
             <span>{content.dev}</span>
             <span className="text-red-500">♥</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;