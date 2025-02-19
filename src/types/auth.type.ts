export type User = {
  id: string;
  email: string;
};

export type AuthStore = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: User | null;
  token: string | null;
  setToken: (value: string) => void;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = { token: string };
