
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Eye, PenTool, Image as ImageIcon, Search, Filter, Star, TrendingUp, UserPlus, Award, X, Upload, CheckCircle, Calendar, Clock, Share2, Download, MessageCircle, Copy, ChevronRight, Globe, ArrowRight, MessageSquare, ThumbsUp, MoreHorizontal, Layers, ChevronDown, Frown } from 'lucide-react';

// --- Types & Interfaces ---
type ContentType = 'article' | 'image';
type Category = 'Technology' | 'Art' | 'Marketing' | 'Education' | 'Business' | 'Design' | 'Health';
type SortOption = 'latest' | 'popular' | 'views';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: string;
  isPro: boolean;
  bio?: string;
  jobTitle?: string;
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

interface Post {
  id: number;
  type: ContentType;
  category: Category;
  author: Creator;
  title: string;
  snippet?: string;
  content?: string; // HTML Content
  coverImage?: string; // For Articles
  image?: string;   // For Image Posts
  likes: number;
  views: number;
  commentsCount: number;
  commentsList?: Comment[];
  timestamp: number;
  timeLabel: string;
  readTime?: string;
  prompt?: string;   // For images
  model?: string;    // AI Model used
  dimensions?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

// --- Helper Functions ---

const downloadImage = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (e) {
    window.open(url, '_blank');
  }
};

// --- Realistic Mock Data ---

const creators: Creator[] = [
  { id: 'c1', name: 'سارة علي', avatar: 'SA', followers: '12.5K', isPro: true, jobTitle: 'كاتبة تقنية', bio: 'أكتب عن مستقبل الذكاء الاصطناعي.' },
  { id: 'c2', name: 'أحمد محمد', avatar: 'AM', followers: '8.2K', isPro: false, jobTitle: 'فنان رقمي', bio: 'أحول الخيال إلى واقع رقمي.' },
  { id: 'c3', name: 'كريم محمود', avatar: 'KM', followers: '25K', isPro: true, jobTitle: 'مهندس معماري', bio: 'استكشاف العمارة المستقبلية.' },
  { id: 'c4', name: 'منى خليل', avatar: 'MK', followers: '15K', isPro: true, jobTitle: 'خبيرة SEO', bio: 'أساعد الشركات على تصدر نتائج البحث.' },
  { id: 'c5', name: 'د. يوسف حسن', avatar: 'YH', followers: '40K', isPro: true, jobTitle: 'طبيب باحث', bio: 'تبسيط العلوم للجميع.' },
  { id: 'me', name: 'أنت', avatar: 'ME', followers: '0', isPro: true, jobTitle: 'مبدع جديد', bio: '' },
];

const mockComments: Comment[] = [
    { id: 1, user: "خالد عمر", avatar: "KO", text: "مقال رائع جداً، شكراً لك على هذا الطرح المميز!", time: "منذ 10 دقائق" },
    { id: 2, user: "ليلى أحمد", avatar: "LA", text: "هل يمكن استخدام هذه الأدوات بشكل مجاني؟", time: "منذ 30 دقيقة" },
    { id: 3, user: "سامي يوسف", avatar: "SY", text: "التصميم مذهل، ما هو البرومبت المستخدم بدقة؟", time: "منذ ساعة" }
];

const contentTemplate = (topic: string) => `
<p class="lead text-xl text-gray-600 mb-6 font-medium leading-relaxed">هذا المقال يستعرض بشكل مفصل وشامل موضوع <strong>${topic}</strong>، حيث نناقش أحدث التطورات والتقنيات المستخدمة.</p>
<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">أهمية الموضوع في العصر الحالي</h2>
<p class="mb-4 text-gray-600 leading-loose">في ظل التسارع الرقمي، أصبح فهم ${topic} أمراً حتمياً. تشير الدراسات الأخيرة إلى أن التبني المبكر لهذه المفاهيم يؤدي إلى نتائج مذهلة.</p>
<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80" class="w-full rounded-xl my-6 shadow-md" alt="Detail Image" />
<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">النقاط الرئيسية</h2>
<ul class="list-disc list-inside space-y-2 mb-6 text-gray-600">
    <li>تحسين الكفاءة والإنتاجية بشكل ملحوظ.</li>
    <li>تقليل التكاليف التشغيلية على المدى الطويل.</li>
    <li>فتح آفاق جديدة للإبداع والابتكار.</li>
</ul>
<div class="bg-blue-50 border-r-4 border-blue-500 p-6 my-8 rounded-l-lg">
    <p class="font-bold text-blue-900 text-lg mb-2">خلاصة القول:</p>
    <p class="text-blue-800 leading-relaxed">نحن أمام ثورة حقيقية في مجال ${topic}، والاستعداد لها يبدأ من اليوم.</p>
</div>
`;

const initialPosts: Post[] = [
  {
    id: 1,
    type: 'image',
    category: 'Technology',
    author: creators[2],
    title: 'مدينة نيوم: رؤية المستقبل',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Ultra-realistic futuristic city in Saudi Arabia desert, NEOM line style, flying vehicles, sunset lighting, cinematic 8k resolution',
    model: 'Midjourney v6',
    dimensions: '16:9',
    likes: 2340,
    views: 15000,
    commentsCount: 45,
    commentsList: mockComments,
    timestamp: Date.now() - 3600000 * 2,
    timeLabel: 'منذ ساعتين',
    isFeatured: true,
    isTrending: true
  },
  {
    id: 2,
    type: 'article',
    category: 'Education',
    author: creators[0],
    title: 'كيف سيغير الذكاء الاصطناعي مستقبل التعليم؟',
    snippet: 'التعليم يتغير بسرعة هائلة. نناقش في هذا المقال كيف يمكن للمدارس العربية الاستفادة من تقنيات AI...',
    content: contentTemplate('الذكاء الاصطناعي في التعليم'),
    coverImage: 'https://images.unsplash.com/photo-1509062522246-37559cc792f9?q=80&w=1200&auto=format&fit=crop',
    likes: 890,
    views: 5430,
    commentsCount: 120,
    commentsList: mockComments,
    timestamp: Date.now() - 3600000 * 5,
    timeLabel: 'منذ 5 ساعات',
    readTime: '5 دقائق',
    isTrending: true
  },
  {
    id: 3,
    type: 'image',
    category: 'Art',
    author: creators[1],
    title: 'رائد فضاء تائه',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Lonely astronaut sitting on a rock in a red mars landscape, looking at a distant blue earth, highly detailed, dramatic lighting',
    model: 'DALL-E 3',
    dimensions: '1:1',
    likes: 1205,
    views: 8900,
    commentsCount: 32,
    timestamp: Date.now() - 3600000 * 8,
    timeLabel: 'منذ 8 ساعات',
    isTrending: true
  },
  {
    id: 4,
    type: 'article',
    category: 'Marketing',
    author: creators[3],
    title: 'دليل تحسين محركات البحث (SEO) لعام 2024',
    snippet: 'هل تريد تصدر نتائج البحث؟ جوجل قامت بتحديث خوارزمياتها مؤخراً. إليك أهم الاستراتيجيات...',
    content: contentTemplate('تحسين محركات البحث'),
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
    likes: 3500,
    views: 42000,
    commentsCount: 215,
    timestamp: Date.now() - 86400000,
    timeLabel: 'منذ يوم واحد',
    readTime: '8 دقائق',
    isTrending: true
  },
  {
    id: 5,
    type: 'image',
    category: 'Design',
    author: creators[1],
    title: 'واجهة تطبيق سفر',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    prompt: 'Mobile app UI design for a travel booking application, clean minimalist style, blue and white color palette',
    model: 'Stable Diffusion XL',
    dimensions: '9:16',
    likes: 670,
    views: 2100,
    commentsCount: 18,
    timestamp: Date.now() - 86400000 * 2,
    timeLabel: 'منذ يومين'
  },
  {
    id: 6,
    type: 'image',
    category: 'Business',
    author: creators[2],
    title: 'مكتب في الطبيعة',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    prompt: 'A modern glass office located in the middle of a dense green forest, sustainable architecture, natural light',
    model: 'Midjourney v5.2',
    dimensions: '16:9',
    likes: 1500,
    views: 10000,
    commentsCount: 55,
    timestamp: Date.now() - 86400000 * 3,
    timeLabel: 'منذ 3 أيام'
  },
  // --- New Content Added ---
  {
    id: 7,
    type: 'article',
    category: 'Health',
    author: creators[4],
    title: '5 عادات صباحية لصحة أفضل',
    snippet: 'ابدأ يومك بنشاط وحيوية مع هذه العادات البسيطة التي يوصي بها الأطباء.',
    content: contentTemplate('الصحة العامة والعادات الصباحية'),
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    likes: 450,
    views: 1200,
    commentsCount: 10,
    timestamp: Date.now() - 86400000 * 4,
    timeLabel: 'منذ 4 أيام',
    readTime: '3 دقائق'
  },
  {
    id: 8,
    type: 'image',
    category: 'Art',
    author: creators[1],
    title: 'أمواج صوتية ملونة',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Abstract visual representation of sound waves, neon colors, dark background, 3D render',
    model: 'Blender 3D + AI',
    dimensions: '16:9',
    likes: 2100,
    views: 5000,
    commentsCount: 40,
    timestamp: Date.now() - 86400000 * 4,
    timeLabel: 'منذ 4 أيام',
    isTrending: true
  },
  {
    id: 9,
    type: 'article',
    category: 'Technology',
    author: creators[0],
    title: 'تعلم البرمجة من الصفر في 2024',
    snippet: 'خارطة طريق كاملة لتعلم البرمجة، من لغات الويب وحتى الذكاء الاصطناعي.',
    content: contentTemplate('تعلم البرمجة'),
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop',
    likes: 3200,
    views: 18000,
    commentsCount: 150,
    timestamp: Date.now() - 86400000 * 5,
    timeLabel: 'منذ 5 أيام',
    readTime: '10 دقائق'
  },
  {
    id: 10,
    type: 'image',
    category: 'Design',
    author: creators[2],
    title: 'غرفة معيشة بوهيمية',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Interior design, bohemian living room, plants, cozy lighting, beige and earth tones, photorealistic',
    model: 'Midjourney v6',
    dimensions: '4:3',
    likes: 800,
    views: 3000,
    commentsCount: 25,
    timestamp: Date.now() - 86400000 * 6,
    timeLabel: 'منذ 6 أيام'
  },
   {
    id: 11,
    type: 'article',
    category: 'Business',
    author: creators[3],
    title: 'أسرار التجارة الإلكترونية',
    snippet: 'كيف تبدأ متجرك الإلكتروني وتختار المنتجات الرابحة؟ دليل شامل للمبتدئين.',
    content: contentTemplate('التجارة الإلكترونية'),
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1200&auto=format&fit=crop',
    likes: 150,
    views: 800,
    commentsCount: 5,
    timestamp: Date.now() - 86400000 * 7,
    timeLabel: 'منذ أسبوع',
    readTime: '6 دقائق'
  },
  {
    id: 12,
    type: 'image',
    category: 'Art',
    author: creators[1],
    title: 'مدينة السايبربانك',
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Cyberpunk city street at night, neon lights, rain, reflections, futuristic cars, highly detailed anime style',
    model: 'Niji Journey',
    dimensions: '16:9',
    likes: 4000,
    views: 25000,
    commentsCount: 300,
    timestamp: Date.now() - 86400000 * 8,
    timeLabel: 'منذ أسبوع',
    isTrending: true
  }
];

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeType, setActiveType] = useState<'all' | ContentType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);
  
  // Article Reader State
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({
      title: '',
      type: 'article' as ContentType,
      category: 'Technology' as Category,
      description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
     const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
     const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
     setScrollProgress(progress);
  };

  const handleLoadMore = () => {
      setVisiblePostsCount(prev => prev + 6);
  };

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    const matchCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchType = activeType === 'all' || post.type === activeType;
    
    const term = searchTerm.toLowerCase().trim();
    const matchSearch = term === '' || 
                        post.title.toLowerCase().includes(term) || 
                        post.author.name.toLowerCase().includes(term) ||
                        post.snippet?.toLowerCase().includes(term);

    return matchCategory && matchType && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'views') return b.views - a.views;
    return b.timestamp - a.timestamp;
  });

  const trendingPosts = posts.filter(p => p.isTrending).slice(0, 5);

  const handleLike = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    if (selectedPost && selectedPost.id === id) {
        setSelectedPost(prev => prev ? {...prev, likes: prev.likes + 1} : null);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newPostData.title || !newPostData.description) return;

      setIsSubmitting(true);

      setTimeout(() => {
          const newPost: Post = {
              id: Date.now(),
              type: newPostData.type,
              category: newPostData.category,
              author: creators[5], // Me
              title: newPostData.title,
              likes: 0,
              views: 0,
              commentsCount: 0,
              timestamp: Date.now(),
              timeLabel: 'الآن',
              image: newPostData.type === 'image' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' : undefined,
              coverImage: newPostData.type === 'article' ? 'https://images.unsplash.com/photo-1499750310159-5b5f221327e6?q=80&w=1000&auto=format&fit=crop' : undefined,
              snippet: newPostData.type === 'article' ? newPostData.description.substring(0, 100) + '...' : undefined,
              content: newPostData.type === 'article' ? contentTemplate(newPostData.title) : undefined,
              prompt: newPostData.type === 'image' ? newPostData.description : undefined,
              model: 'Al-Mubdi v1.0',
              dimensions: '1024x1024',
              readTime: 'دقيقة واحدة'
          };

          setPosts(prev => [newPost, ...prev]);
          setIsSubmitting(false);
          setIsCreateModalOpen(false);
          setNewPostData({ title: '', type: 'article', category: 'Technology', description: '' });
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- Hero Section --- */}
      <div className="bg-[#312B8B] pt-12 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-30 animate-pulse"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                مجتمع <span className="text-secondary">المبدعين</span>
              </h1>
              <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed opacity-90">
                شارك إبداعاتك، استلهم من الآخرين، وتواصل مع آلاف المبدعين العرب.
              </p>
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-primary-dark px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-secondary/20 transition-transform hover:scale-105 flex items-center gap-2 group"
            >
              <Upload size={22} className="group-hover:-translate-y-1 transition-transform" />
              شارك عملك
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto max-w-7xl px-4 -mt-10 relative z-20">
        
        {/* Trending Section (Restored & Sticky Top) */}
        <div className="mb-10">
            <div className="bg-gray-900/95 backdrop-blur text-white p-4 rounded-t-2xl flex items-center gap-2 border-b border-gray-800">
                <TrendingUp size={20} className="text-secondary" />
                <h3 className="font-bold text-lg">الأكثر رواجاً (Trending)</h3>
            </div>
            <div className="bg-gray-900 p-4 rounded-b-2xl shadow-2xl overflow-x-auto">
                <div className="flex gap-4 min-w-max">
                    {trendingPosts.map(post => (
                        <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="w-72 bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:ring-2 ring-secondary transition-all relative group"
                        >
                            <img src={post.type === 'image' ? post.image : post.coverImage} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={post.title} />
                            <div className="p-3">
                                <h4 className="font-bold text-white text-sm truncate mb-1">{post.title}</h4>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{post.author.name}</span>
                                    <span className="flex items-center gap-1"><Heart size={10} className="text-red-500 fill-red-500"/> {post.likes}</span>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-secondary text-primary-dark text-[10px] font-bold px-2 py-0.5 rounded">#{trendingPosts.indexOf(post) + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                    <div className="relative mb-6">
                        <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="text"
                            placeholder="بحث (مثال: نيوم، صحة...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                        />
                    </div>

                    {/* Filters */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-800 mb-3">نوع المحتوى</h3>
                        <div className="flex flex-col gap-2">
                             <button onClick={() => setActiveType('all')} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeType === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                 <span>الكل</span>
                                 <Layers size={16}/>
                             </button>
                             <button onClick={() => setActiveType('article')} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeType === 'article' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                 <span>مقالات</span>
                                 <PenTool size={16}/>
                             </button>
                             <button onClick={() => setActiveType('image')} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeType === 'image' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                 <span>صور AI</span>
                                 <ImageIcon size={16}/>
                             </button>
                        </div>
                    </div>

                    <div className="mb-6">
                         <h3 className="font-bold text-gray-800 mb-3">التصنيفات</h3>
                         <div className="flex flex-wrap gap-2">
                             {['All', 'Technology', 'Art', 'Design', 'Marketing', 'Education', 'Business', 'Health'].map(cat => (
                                 <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${activeCategory === cat ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                 >
                                     {cat === 'All' ? 'الكل' : cat}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="lg:col-span-3">
                {/* Sort & Count */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
                    <div className="text-sm text-gray-500 font-medium">
                        عرض <span className="text-gray-900 font-bold">{Math.min(visiblePostsCount, filteredPosts.length)}</span> من أصل <span className="text-gray-900 font-bold">{filteredPosts.length}</span>
                    </div>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 py-2 px-4 outline-none focus:border-primary cursor-pointer"
                    >
                        <option value="latest">الأحدث</option>
                        <option value="popular">الأكثر إعجاباً</option>
                        <option value="views">الأكثر مشاهدة</option>
                    </select>
                </div>

                {/* Post Cards */}
                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                        {filteredPosts.slice(0, visiblePostsCount).map(post => (
                            <div 
                                key={post.id}
                                onClick={() => setSelectedPost(post)}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
                            >
                                <div className="relative h-56 overflow-hidden bg-gray-100">
                                    <img 
                                        src={post.type === 'article' ? post.coverImage : post.image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                        onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=Image+Error'}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1 text-white backdrop-blur-md ${post.type === 'article' ? 'bg-blue-600/90' : 'bg-purple-600/90'}`}>
                                            {post.type === 'article' ? <PenTool size={12}/> : <ImageIcon size={12}/>}
                                            {post.type === 'article' ? 'مقال' : 'صورة'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col">
                                    <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{post.category}</div>
                                    <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                    
                                    {post.type === 'article' && (
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.snippet}</p>
                                    )}
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{post.author.avatar}</div>
                                            <div className="text-xs font-bold text-gray-700">{post.author.name}</div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400 text-xs font-bold">
                                            <span className="flex items-center gap-1"><Eye size={14}/> {post.views}</span>
                                            <span className={`flex items-center gap-1 ${post.likes > 1000 ? 'text-red-500' : ''}`}><Heart size={14} className={post.likes > 1000 ? "fill-red-500" : ""} /> {post.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Frown size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-500">لم نعثر على أي عمل يطابق بحثك. جرب كلمات أخرى.</p>
                    </div>
                )}

                {/* Load More Button */}
                {visiblePostsCount < filteredPosts.length && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={handleLoadMore}
                            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:text-primary transition-colors shadow-sm flex items-center gap-2 mx-auto"
                        >
                            رؤية المزيد <ChevronDown size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* --- Article Reader Modal --- */}
      {selectedPost && selectedPost.type === 'article' && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom-10 duration-300 flex flex-col">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 w-full fixed top-0 z-[60]">
                <div className="h-full bg-primary transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* Navbar */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-3 flex justify-between items-center z-50 shadow-sm">
                <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><Share2 size={20}/></button>
                    <button onClick={() => handleLike(selectedPost.id)} className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black flex items-center gap-2">
                        <Heart size={16} className={selectedPost.likes > 0 ? "fill-white" : ""} /> {selectedPost.likes}
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1" onScroll={handleScroll}>
                <div className="max-w-3xl mx-auto px-6 py-10">
                    <div className="text-center mb-10">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-4">{selectedPost.category}</span>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">{selectedPost.title}</h1>
                        
                        <div className="flex justify-center items-center gap-8 text-gray-500 text-sm border-y border-gray-100 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">{selectedPost.author.avatar}</div>
                                <div className="text-right">
                                    <div className="text-gray-900 font-bold">{selectedPost.author.name}</div>
                                    <div className="text-xs">{selectedPost.author.jobTitle}</div>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-200"></div>
                            <div className="flex gap-6">
                                <span className="flex items-center gap-2"><Calendar size={18}/> {selectedPost.timeLabel}</span>
                                <span className="flex items-center gap-2"><Clock size={18}/> {selectedPost.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <img 
                        src={selectedPost.coverImage} 
                        alt="Cover" 
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl mb-12 shadow-2xl"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/800x400'}
                    />

                    <div 
                        className="prose prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-loose prose-li:text-gray-600 font-sans mb-16"
                        dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }}
                    />

                    {/* Comments Section */}
                    <div className="bg-gray-50 rounded-3xl p-8">
                        <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                            <MessageSquare className="text-primary" /> التعليقات ({selectedPost.commentsCount})
                        </h3>
                        <div className="space-y-6">
                            {mockComments.map(comment => (
                                <div key={comment.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 shrink-0">
                                        {comment.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900">{comment.user}</span>
                                            <span className="text-xs text-gray-400">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4">
                                <textarea placeholder="اكتب تعليقاً..." className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none h-24"></textarea>
                                <button className="mt-2 px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark">إرسال</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- Image Lightbox --- */}
      {selectedPost && selectedPost.type === 'image' && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex animate-in fade-in duration-200">
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                  <X size={24} />
              </button>

              <div className="flex-grow h-full flex items-center justify-center p-4 md:p-10 overflow-hidden">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                    onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x600'}
                  />
              </div>

              <div className="w-96 bg-gray-900 border-r border-gray-800 p-6 flex flex-col text-white overflow-y-auto shrink-0 hidden md:flex">
                  <div className="mb-8">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold border border-gray-600 text-lg">
                              {selectedPost.author.avatar}
                          </div>
                          <div>
                              <div className="font-bold text-lg">{selectedPost.author.name}</div>
                              <button className="text-primary text-sm font-bold hover:underline">متابعة</button>
                          </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-4 leading-snug">{selectedPost.title}</h2>
                      <div className="flex gap-6 text-sm text-gray-400 border-y border-gray-800 py-4">
                          <span className="flex items-center gap-2"><Eye size={16}/> {selectedPost.views}</span>
                          <span className="flex items-center gap-2"><Heart size={16} className="text-red-500"/> {selectedPost.likes}</span>
                      </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-5 mb-6 border border-gray-700">
                      <div className="flex justify-between items-center mb-3">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                              <PenTool size={12}/> الأمر (Prompt)
                          </label>
                          <button onClick={() => {navigator.clipboard.writeText(selectedPost.prompt || ''); alert('تم النسخ!')}} className="text-xs text-primary hover:text-white transition-colors flex items-center gap-1 font-bold">
                              <Copy size={12} /> نسخ
                          </button>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed font-mono bg-black/30 p-3 rounded-lg border border-gray-700/50">
                          {selectedPost.prompt}
                      </p>
                  </div>

                  <div className="space-y-4 mb-auto">
                      <div className="flex justify-between text-sm py-2 border-b border-gray-800">
                          <span className="text-gray-500">الموديل</span>
                          <span className="font-bold text-gray-200">{selectedPost.model}</span>
                      </div>
                      <div className="flex justify-between text-sm py-2 border-b border-gray-800">
                          <span className="text-gray-500">الأبعاد</span>
                          <span className="font-bold text-gray-200">{selectedPost.dimensions}</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => downloadImage(selectedPost.image!, `${selectedPost.title}.jpg`)}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-2 mt-6 shadow-lg shadow-primary/20"
                  >
                      <Download size={20} /> تحميل الصورة
                  </button>
              </div>
          </div>
      )}

      {/* --- Share Modal --- */}
      {isCreateModalOpen && (
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-0 max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h3 className="font-bold text-xl text-gray-800">نشر عمل جديد</h3>
                      <button onClick={() => setIsCreateModalOpen(false)} className="p-2 bg-white rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><X size={20}/></button>
                  </div>
                  
                  <form onSubmit={handleCreatePost} className="p-6 space-y-5">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">ماذا تود أن تشارك؟</label>
                          <div className="grid grid-cols-2 gap-4">
                              <button 
                                type="button" 
                                onClick={() => setNewPostData({...newPostData, type: 'article'})}
                                className={`py-4 rounded-2xl text-sm font-bold transition-all border-2 flex flex-col items-center gap-2 ${newPostData.type === 'article' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                              >
                                  <PenTool size={24} />
                                  مقال / تدوينة
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setNewPostData({...newPostData, type: 'image'})}
                                className={`py-4 rounded-2xl text-sm font-bold transition-all border-2 flex flex-col items-center gap-2 ${newPostData.type === 'image' ? 'bg-purple-50 border-purple-500 text-purple-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                              >
                                  <ImageIcon size={24} />
                                  صورة AI
                              </button>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">عنوان العمل</label>
                          <input 
                            type="text" 
                            value={newPostData.title}
                            onChange={(e) => setNewPostData({...newPostData, title: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-800 font-medium"
                            placeholder="اختر عنواناً مميزاً..."
                            required
                          />
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
                          <select 
                            value={newPostData.category}
                            onChange={(e) => setNewPostData({...newPostData, category: e.target.value as Category})}
                            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none bg-white cursor-pointer"
                          >
                              <option value="Technology">تكنولوجيا (Technology)</option>
                              <option value="Art">فن (Art)</option>
                              <option value="Design">تصميم (Design)</option>
                              <option value="Marketing">تسويق (Marketing)</option>
                              <option value="Education">تعليم (Education)</option>
                              <option value="Business">أعمال (Business)</option>
                              <option value="Health">صحة (Health)</option>
                          </select>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                              {newPostData.type === 'article' ? 'مقتطف قصير' : 'وصف الصورة (Prompt)'}
                          </label>
                          <textarea 
                            value={newPostData.description}
                            onChange={(e) => setNewPostData({...newPostData, description: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none min-h-[120px] resize-none"
                            placeholder={newPostData.type === 'article' ? "اكتب مقدمة مشوقة لمقالك..." : "وصف دقيق للصورة التي أنشأتها..."}
                            required
                          ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-secondary hover:bg-secondary-hover text-primary-dark font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-4 text-lg shadow-lg shadow-secondary/20"
                      >
                          {isSubmitting ? (
                              <>جاري النشر...</>
                          ) : (
                              <>نشر العمل <ArrowRight size={20} className="rotate-180"/></>
                          )}
                      </button>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
};

export default CommunityPage;
