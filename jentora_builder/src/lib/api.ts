const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_EDITOR';
  active: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_EDITOR';
}

export interface ContactQuery {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  estimatedBudget: string;
  message: string;
  source: 'CONTACT_PAGE' | 'PROJECT_QUOTE_POPUP' | 'HERO_POPUP' | 'DIRECT';
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalQueries: number;
  newQueries: number;
  inProgressQueries: number;
  resolvedQueries: number;
  totalUsers: number;
  totalProjects: number;
  queriesBySource: Record<string, number>;
}

// Token & Session Storage
const TOKEN_KEY = 'jentora_admin_token';
const USER_KEY = 'jentora_admin_user';

export const authStorage = {
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setSession: (token: string, user: Partial<User>) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to store auth token', e);
    }
  },
  getUser: (): User | null => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Failed to clear auth session', e);
    }
  },
  isAuthenticated: (): boolean => {
    return Boolean(authStorage.getToken());
  },
};

// Generic Fetch Wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const resJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // If unauthorized during admin route, we may want to redirect
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        authStorage.clear();
      }
    }
    const msg = resJson.message || resJson.error || `HTTP error ${response.status}`;
    throw new Error(msg);
  }

  return resJson;
}

// Public Inquiries API
export const publicApi = {
  submitContact: async (data: {
    fullName: string;
    phone: string;
    email: string;
    projectType: string;
    location: string;
    estimatedBudget?: string;
    message: string;
    source?: string;
  }) => {
    return request<{ success: boolean; message: string; data: ContactQuery }>('/contact/submit', {
      method: 'POST',
      body: JSON.stringify({ ...data, source: data.source || 'CONTACT_PAGE' }),
    });
  },

  submitQuote: async (data: {
    fullName: string;
    phone: string;
    email: string;
    projectType: string;
    location: string;
    estimatedBudget?: string;
    message: string;
  }) => {
    return request<{ success: boolean; message: string; data: ContactQuery }>('/quote/submit', {
      method: 'POST',
      body: JSON.stringify({ ...data, source: 'PROJECT_QUOTE_POPUP' }),
    });
  },

  getPublicContent: async () => {
    return request<{ success: boolean; data: Record<string, any> }>('/public/content');
  },
};

// Auth API
export const authApi = {
  login: async (credentials: { username: string; password: string }) => {
    const res = await request<{ success: boolean; message: string; data: AuthResponse }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.data?.token) {
      authStorage.setSession(res.data.token, {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        fullName: res.data.fullName,
        role: res.data.role,
      });
    }
    return res.data;
  },

  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout notification error:', e);
    } finally {
      authStorage.clear();
    }
  },

  getMe: async () => {
    return request<{ success: boolean; data: User }>('/auth/me');
  },
};

// Admin API
export const adminApi = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await request<{ success: boolean; data: DashboardStats }>('/admin/stats');
    return res.data;
  },

  getQueries: async (params?: { status?: string; search?: string }): Promise<ContactQuery[]> => {
    const queryParts: string[] = [];
    if (params?.status) queryParts.push(`status=${encodeURIComponent(params.status)}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    const qStr = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    const res = await request<{ success: boolean; data: ContactQuery[] }>(`/admin/queries${qStr}`);
    return res.data;
  },

  updateQueryStatus: async (id: number, payload: { status: string; adminNotes?: string }) => {
    return request<{ success: boolean; message: string; data: ContactQuery }>(`/admin/queries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  deleteQuery: async (id: number) => {
    return request<{ success: boolean; message: string }>(`/admin/queries/${id}`, {
      method: 'DELETE',
    });
  },

  // User Management (Super Admin)
  getUsers: async (): Promise<User[]> => {
    const res = await request<{ success: boolean; data: User[] }>('/admin/users');
    return res.data;
  },

  createUser: async (user: {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
  }) => {
    return request<{ success: boolean; message: string; data: User }>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  updateUser: async (
    id: number,
    user: {
      email?: string;
      fullName?: string;
      password?: string;
      role?: string;
      active?: boolean;
    }
  ) => {
    return request<{ success: boolean; message: string; data: User }>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  },

  deleteUser: async (id: number) => {
    return request<{ success: boolean; message: string }>(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Content Management (CMS)
  getAllContent: async (): Promise<Record<string, any>> => {
    const res = await request<{ success: boolean; data: Record<string, any> }>('/admin/content');
    return res.data;
  },

  updateContentSection: async (sectionKey: string, contentJson: Record<string, any>) => {
    return request<{ success: boolean; message: string }>(`/admin/content/${sectionKey}`, {
      method: 'PUT',
      body: JSON.stringify({ contentJson }),
    });
  },
};
