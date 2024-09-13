export interface IPagination {
  offset: number;
  limit: number;
  search?: string;

  [key: string]: any;
}

export interface IPaginationResponse<T> {
  results: T[];
  result?: T[];
  total: number;
}

export interface ICommonResponse<T> {
  result: {
    data: T;
    total?: number;
  };
  message: string;
  statusCode: number;
}
