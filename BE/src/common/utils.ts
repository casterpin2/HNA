import { HttpStatus } from '@nestjs/common';
import { NoPageResponse, PageResponse } from './interface/page-reponse.interface';
import { PageRequest } from './interface/page-request.interface';
import { ResponseSuccessDto } from './response.dto';



export function createPageResponse<T>(
  data: T[],
  pageRequest: PageRequest,
  totalRecords?: number,
): PageResponse<T> {
  return {
    data,
    ...pageRequest,
    totalRecords,
    totalPages: Math.ceil(totalRecords / pageRequest.pageSize),
  };
}

export function createNoPageResponse<T>(
  data: T[],
  totalRecords?: number,
): NoPageResponse<T> {
  return {
    data,
    totalRecords,
  };
}

export function createErrorResponse<T>(
  errorCode: string,
  statusCode: HttpStatus,
) {
  return {
    statusCode,
    message: errorCode,
  };
}

export function createSuccessResponse<T>(
  data: T[],
  message = 'Update successfully',
  statusCode: HttpStatus = HttpStatus.OK,
): ResponseSuccessDto<T> {
  return {
    data,
    message,
    statusCode,
  };
}
export enum CategoryLanguague {
  VN = 'VN',
  EN = 'EN',
}
