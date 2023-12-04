import { Test } from 'types/index';
import {
  CreateTestResponse,
  PassTestRequest,
  PassTestResponse,
  TestRequest,
  TestResponse,
  TestsRequest,
  TestsResponse,
} from 'types/tests.ts';

import { $authHost } from './index.ts';

export const TestsService = {
  async getTests({ page = 1 }: TestsRequest) {
    const { data } = await $authHost.get<TestsResponse>(`/v1/tests?page=${page}`);
    return data;
  },
  async getTest({ id }: TestRequest) {
    const { data } = await $authHost.get<TestResponse>(`/v1/tests/${id}`);
    return data;
  },
  async passTest({ testId, userId }: PassTestRequest) {
    const { data } = await $authHost.post<PassTestResponse>('/v1/users/pass-test', {
      testId,
      userId,
    });
    return data;
  },
  async createNewTest(newTest: Omit<Test, 'id'>) {
    const { data } = await $authHost.post<CreateTestResponse>('/v1/tests', {
      ...newTest,
    });
    return data;
  },
};
