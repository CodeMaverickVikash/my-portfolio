// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "/api";

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    ME: `${API_BASE_URL}/auth/me`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  TECH_STACK: {
    BASE: `${API_BASE_URL}/tech-stack`,
    STATS: `${API_BASE_URL}/tech-stack/stats`,
    BY_ID: (id: string) => `${API_BASE_URL}/tech-stack/${id}`,
  },
} as const;

// Token management
export const TokenManager = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const accessToken = TokenManager.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

// Refresh access token
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = TokenManager.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (data.success && data.accessToken) {
      TokenManager.setAccessToken(data.accessToken);
      TokenManager.setRefreshToken(data.refreshToken);
      return data.accessToken;
    }

    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

// Enhanced fetch with automatic token refresh
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const headers = getAuthHeaders();

  let response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  // If access token expired, try to refresh
  if (response.status === 401) {
    const data = await response.json();

    if (data.code === 'TOKEN_EXPIRED') {
      if (!isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;

        if (newToken) {
          onTokenRefreshed(newToken);

          // Retry original request with new token
          const newHeaders = getAuthHeaders();
          response = await fetch(url, {
            ...options,
            headers: {
              ...newHeaders,
              ...options.headers,
            },
          });
        } else {
          // Refresh failed, clear tokens and redirect to login
          TokenManager.clearTokens();
          window.location.href = '/login';
        }
      } else {
        // Wait for token refresh to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh(async (token) => {
            const newHeaders = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            };

            const retryResponse = await fetch(url, {
              ...options,
              headers: {
                ...newHeaders,
                ...options.headers,
              },
            });

            resolve(retryResponse);
          });
        });
      }
    }
  }

  return response;
};

// API helper functions
export const api = {
  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Get current user
  getMe: async () => {
    const response = await fetchWithAuth(API_ENDPOINTS.AUTH.ME, {
      method: 'GET',
    });
    return response.json();
  },

  // Logout
  logout: async () => {
    const response = await fetchWithAuth(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
    return response.json();
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  },

  // Tech Stack CRUD operations
  techStack: {
    // Get all tech stack items
    getAll: async (params?: { category?: string; search?: string; isActive?: boolean }) => {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));

      const url = `${API_ENDPOINTS.TECH_STACK.BASE}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url, { method: 'GET' });
      return response.json();
    },

    // Get tech stack statistics
    getStats: async () => {
      const response = await fetch(API_ENDPOINTS.TECH_STACK.STATS, { method: 'GET' });
      return response.json();
    },

    // Get single tech stack item by ID
    getById: async (id: string) => {
      const response = await fetch(API_ENDPOINTS.TECH_STACK.BY_ID(id), { method: 'GET' });
      return response.json();
    },

    // Create new tech stack item (Protected)
    create: async (data: any) => {
      const response = await fetchWithAuth(API_ENDPOINTS.TECH_STACK.BASE, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    },

    // Update tech stack item (Protected)
    update: async (id: string, data: any) => {
      const response = await fetchWithAuth(API_ENDPOINTS.TECH_STACK.BY_ID(id), {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return response.json();
    },

    // Delete tech stack item (Protected)
    delete: async (id: string) => {
      const response = await fetchWithAuth(API_ENDPOINTS.TECH_STACK.BY_ID(id), {
        method: 'DELETE',
      });
      return response.json();
    },
  },
};

