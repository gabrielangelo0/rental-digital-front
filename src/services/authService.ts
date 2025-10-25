import { apiService } from '@/lib/api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';

const AUTH_TOKEN_KEY = 'digitalrent_token';
const AUTH_USER_KEY = 'digitalrent_user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      this.setAuth(response.token, response.user);
      return response;
    } catch (error) {
      // Fallback para simular login localmente
      const users = this.getStoredUsers();
      const user = users.find(u => u.email === credentials.email);
      
      if (user && credentials.password === 'password') {
        const token = `fake-token-${Date.now()}`;
        this.setAuth(token, user);
        return { user, token };
      }
      
      throw new Error('Email ou senha inválidos');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', data);
      this.setAuth(response.token, response.user);
      return response;
    } catch (error) {
      // Fallback para simular cadastro localmente
      const users = this.getStoredUsers();
      
      if (users.find(u => u.email === data.email)) {
        throw new Error('Email já cadastrado');
      }
      
      const newUser: User = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('digitalrent_users', JSON.stringify(users));
      
      const token = `fake-token-${Date.now()}`;
      this.setAuth(token, newUser);
      
      return { user: newUser, token };
    }
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  getUser(): User | null {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  setAuth(token: string, user: User) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  getStoredUsers(): User[] {
    const usersJson = localStorage.getItem('digitalrent_users');
    return usersJson ? JSON.parse(usersJson) : [];
  }
};
