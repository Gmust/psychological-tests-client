import { TestsRequest, TestsResponse } from 'types/tests.ts';

import { $authHost } from './index.ts';

export const TestsService = {
  async getTests({ page = 1 }: TestsRequest) {
    const { data } = await $authHost.get<TestsResponse>(`/v1/tests?page=${page}`);
    return data;
  },
};
