export interface LoginContract {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCheckResult {
  message: string;
  isValid: boolean;
}

export interface SignUpContract {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface SignUpResult {
  id: string;
}

export interface LogoutContract {
  refreshToken?: string | null;
}

export interface TokenSession {
  accessToken?: string | null;
  refreshToken?: string | null;
}
