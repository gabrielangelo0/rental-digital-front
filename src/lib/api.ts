import axios from 'axios';

// Criar instância do Axios para simular requisições localhost
const api = axios.create({
  baseURL: 'http://localhost:3001/', // URL base do servidor local
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para requisições (adicionar logs, autenticação, etc.)
api.interceptors.request.use(
  (config) => {
    console.log(`Fazendo requisição para: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas (tratamento de erros globais)
api.interceptors.response.use(
  (response) => {
    console.log(`Resposta recebida de: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', error);
    
    // Tratamento específico para diferentes códigos de erro
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      console.log('Token expirado, redirecionando para login...');
    }
    
    return Promise.reject(error);
  }
);

// Funções helper para diferentes tipos de requisições
export const apiService = {
  // GET request
  get: async <T>(url: string, params?: any) => {
    const response = await api.get<T>(url, { params });
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data?: any) => {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data?: any) => {
    const response = await api.put<T>(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string) => {
    const response = await api.delete<T>(url);
    return response.data;
  },
};

export default api;