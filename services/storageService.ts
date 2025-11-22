
export interface Activity {
  id: string;
  type: 'article' | 'image' | 'seo' | 'idea';
  title: string;
  timestamp: number;
}

export interface Stats {
  words: number;
  images: number;
  seoCount: number;
  ideasCount: number;
}

const STORAGE_KEYS = {
  STATS: 'almubdi_stats',
  ACTIVITIES: 'almubdi_activities',
  TIMESTAMPS: 'almubdi_timestamps'
};

export const getStats = (): Stats => {
  const stored = localStorage.getItem(STORAGE_KEYS.STATS);
  return stored ? JSON.parse(stored) : { words: 0, images: 0, seoCount: 0, ideasCount: 0 };
};

export const updateStats = (newStats: Partial<Stats>) => {
  const current = getStats();
  const updated = { 
      words: current.words + (newStats.words || 0),
      images: current.images + (newStats.images || 0),
      seoCount: current.seoCount + (newStats.seoCount || 0),
      ideasCount: current.ideasCount + (newStats.ideasCount || 0),
  };
  
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
  return updated;
};

export const logActivity = (type: Activity['type'], title: string) => {
  const activities = getActivities();
  const newActivity: Activity = {
    id: Date.now().toString(),
    type,
    title,
    timestamp: Date.now()
  };
  // Keep last 10 activities
  const updated = [newActivity, ...activities].slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));

  // Log timestamp for chart analytics
  logTimestamp();
};

export const getActivities = (): Activity[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  return stored ? JSON.parse(stored) : [];
};

const logTimestamp = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.TIMESTAMPS);
  const timestamps: number[] = stored ? JSON.parse(stored) : [];
  timestamps.push(Date.now());
  // Optimize: Keep only last 30 days to prevent storage overflow
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  const filtered = timestamps.filter(t => t > thirtyDaysAgo);
  localStorage.setItem(STORAGE_KEYS.TIMESTAMPS, JSON.stringify(filtered));
};

export const getWeeklyChartData = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.TIMESTAMPS);
  const timestamps: number[] = stored ? JSON.parse(stored) : [];
  
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const today = new Date();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    last7Days.push({
      date: d.toLocaleDateString('en-US'),
      dayName: days[d.getDay()],
      count: 0
    });
  }

  timestamps.forEach(ts => {
    const dateStr = new Date(ts).toLocaleDateString('en-US');
    const dayObj = last7Days.find(d => d.date === dateStr);
    if (dayObj) {
      dayObj.count++;
    }
  });

  // Scale values for CSS Chart (percentage)
  const max = Math.max(...last7Days.map(d => d.count), 5); // Min scale of 5 to look good

  return last7Days.map(d => ({
    day: d.dayName,
    value: Math.round((d.count / max) * 100),
    raw: d.count
  }));
};
