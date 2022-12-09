export interface PageResponse<T> {
  data: T[];

  totalRecords?: number;
  totalPages?: number;
  pageNo: number;
  pageSize: number;
}

export interface NoPageResponse<T> {
  data: T[];

  totalRecords?: number;
}
