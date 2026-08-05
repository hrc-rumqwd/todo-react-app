export interface Result {
  isSuccess: boolean;
  message: string;
  errors: string[];
}

export interface Result<T> {
  isSuccess: boolean;
  message: string;
  errors: string[];
  data: T;
}
