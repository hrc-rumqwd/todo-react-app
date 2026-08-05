const validPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?#&]{8,}$/;

const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegexOperator = {
  isValidPassword: (password: string): boolean => {
    return validPasswordRegex.test(password);
  },
  isValidEmail: (email: string): boolean => {
    return validEmailRegex.test(email);
  },
};
