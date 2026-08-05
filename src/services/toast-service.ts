import { toast } from 'react-toastify';

export const ToastService = {
  showSuccess: (message: string) => {
    toast.success(message, {
      position: 'top-right',
    });
  },

  showError: (message: string) => {
    toast.error(message, {
      position: 'top-right',
    });
  },

  showWarning: (message: string) => {
    toast.warning(message, {
      position: 'top-right',
    });
  },
};
