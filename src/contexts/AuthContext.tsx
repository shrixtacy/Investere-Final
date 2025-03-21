
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserType = 'investor' | 'startup';

interface UserData {
  id: string;
  fullName: string;
  email: string;
  userType: UserType;
  companyName?: string;
  industry?: string;
  stage?: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('investereUser');
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For now, we'll simulate a successful login with mock data
    
    // Mock user data based on email (in a real app, this would come from your backend)
    const mockUser: UserData = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      fullName: email.split('@')[0],
      email,
      userType: email.includes('startup') ? 'startup' : 'investor',
      ...(email.includes('startup') && {
        companyName: 'Demo Startup',
        industry: 'fintech',
        stage: 'seed',
      }),
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('investereUser', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('investereUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: any) => {
    // In a real app, this would make an API call to register
    // For now, we'll simulate a successful registration
    const newUser: UserData = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      fullName: userData.fullName,
      email: userData.email,
      userType: userData.userType as UserType,
      ...(userData.userType === 'startup' && {
        companyName: userData.companyName,
        industry: userData.industry,
        stage: userData.stage,
      }),
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('investereUser', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
