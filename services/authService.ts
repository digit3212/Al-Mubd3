
// Simulate a real backend delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro';
  joinDate: number;
}

const STORAGE_KEYS = {
  USERS: 'almubdi_users', // "Database" of all users
  SESSION: 'almubdi_session' // Current logged in user
};

export const authService = {
  // Register a new user
  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(800); // Fake network delay

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      throw new Error('البريد الإلكتروني مسجل بالفعل');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, this must be hashed!
      plan: 'Free',
      joinDate: Date.now()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Auto login after register
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword as User;
  },

  // Login existing user
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword as User;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  // Get current session
  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  }
};
