import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api/auth-api';
import { queryClient } from '../../../services/query-client';
import { IdentitySessionQueryKey } from '../types/identity-query-keys';
import { RegexOperator } from '../utils/regex-operator';
import type { SignUpContract } from '../types/authentication';
import { ToastService } from '../../../services/toast-service';

const performSignUp = async (input: SignUpContract) => {
  if (!RegexOperator.isValidEmail(input.email)) {
    ToastService.showError('InvalidEmail');
    throw new Error('InvalidEmail');
  }

  if (!RegexOperator.isValidPassword(input.password)) {
    ToastService.showError('InvalidPassword');
    throw new Error('InvalidPassword');
  }

  if (input.confirmPassword != input.password) {
    ToastService.showError('ConfirmPasswordNotMatchToPassword');
    throw new Error('ConfirmPasswordNotMatchToPassword');
  }

  try {
    return await signUp(input);
  } catch (e) {
    ToastService.showError(e.message);
    throw e;
  }
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: performSignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IdentitySessionQueryKey],
      });
    },
  });
};
