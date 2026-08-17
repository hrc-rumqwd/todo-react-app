export interface TokenSession {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface LoginContract {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResult extends TokenSession {
  accessTokenExpiry: Date;
  refreshTokenExpiry: Date;
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

export interface RefreshTokenContract {
  refreshToken?: string | null;
}

export interface RefreshTokenResult extends TokenSession {
  accessTokenExpiry: Date;
  refreshTokenExpiry: Date;
}
