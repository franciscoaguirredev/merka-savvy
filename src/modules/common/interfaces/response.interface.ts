export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  metadata?: IMetaData;
  error?: any;
}

export interface IMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
