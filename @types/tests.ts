import { Test } from './index';

export interface TestsResponse {
  current_page: number;
  data: Test[];
  total: number;
  per_page: number;
}

export interface TestsRequest {
  page: number;
}
