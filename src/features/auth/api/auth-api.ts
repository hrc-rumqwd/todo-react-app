import {
  type LoginCheckResult as LoginValidateResult,
  type LoginContract,
  type LoginResult,
  type LogoutContract,
  type TokenSession,
  type SignUpContract,
  type SignUpResult,
} from '../types/authentication';
import { httpClient } from '../../../services/http-client';
import { AccessTokenKey, RefreshTokenKey } from '../types/identity-query-keys';
import { ToastService } from '../../../services/toast-service';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?#&]{8,}$/;
const emailCheckRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const fetchMe = (): TokenSession => {
  return {
    accessToken: localStorage.getItem(AccessTokenKey),
    refreshToken: localStorage.getItem(RefreshTokenKey),
  };
};

const isValidPassword = (password: string): boolean => {
  if (!passwordRegex.test(password)) {
    return false;
  }
  return true;
};

const validate = (input: LoginContract): LoginValidateResult => {
  const result = { isValid: true, message: '' } as LoginValidateResult;
  if (!emailCheckRegex.test(input.email)) {
    return { ...result, isValid: false, message: 'InvalidEmail' };
  }

  if (!isValidPassword(input.password)) {
    return { ...result, isValid: false, message: 'InvalidPassword' };
  }

  return result;
};

export const login = async (input: LoginContract) => {
  const validateResult = validate(input);
  if (!validateResult.isValid) {
    throw new Error(validateResult.message);
  }

  const response = await httpClient.post<LoginContract, LoginResult>(
    '/login',
    input
  );
  if (response.accessToken)
    localStorage.setItem(AccessTokenKey, response.accessToken);

  if (response.refreshToken)
    localStorage.setItem(RefreshTokenKey, response.refreshToken);

  return response;
};

export const logout = async (input: LogoutContract): Promise<boolean> => {
  try {
    const response = await httpClient.post<LogoutContract, boolean>(
      '/token/revoke',
      input
    );
    return response;
  } catch (e) {
    ToastService.showError(e.message);
  } finally {
    resetIdentitySpace();
  }

  return true;
};

export const resetIdentitySpace = () => {
  localStorage.removeItem(AccessTokenKey);
  localStorage.removeItem(RefreshTokenKey);
};

export const signUp = async (input: SignUpContract): Promise<SignUpResult> => {
  try {
    const result = await httpClient.post<SignUpContract, SignUpResult>(
      '/register',
      input
    );

    return { ...result } as SignUpResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
