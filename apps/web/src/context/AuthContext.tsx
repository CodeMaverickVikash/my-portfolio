import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, TokenManager } from '../config/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(TokenManager.getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string | null>(TokenManager.getRefreshToken());
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedAccessToken = TokenManager.getAccessToken();
      const storedRefreshToken = TokenManager.getRefreshToken();

      if (storedAccessToken && storedRefreshToken) {
        try {
          const response = await api.getMe();
          if (response.success) {
            setUser(response.user);
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
          } else {
            TokenManager.clearTokens();
            setAccessToken(null);
            setRefreshToken(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          TokenManager.clearTokens();
          setAccessToken(null);
          setRefreshToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);

      if (response.success && response.accessToken && response.refreshToken) {
        setUser(response.user);
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        TokenManager.setAccessToken(response.accessToken);
        TokenManager.setRefreshToken(response.refreshToken);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Call logout API to invalidate refresh token on server
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state and tokens regardless of API call result
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      TokenManager.clearTokens();
    }
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!accessToken && !!refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

