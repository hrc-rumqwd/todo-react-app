export interface Result {
  isSuccess: boolean;
  message: string | null;
  errors: string[] | null;
}

export interface ResultWithData<T> extends Result {
  data: T;
}

export interface PaginationResult<T> {
  items: T[];
  pageSize: number;
  pageIndex: number;
  totalRows: number;
}
