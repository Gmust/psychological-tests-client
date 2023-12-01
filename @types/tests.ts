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

export interface TestRequest {
  id: number;
}

export interface TestResponse {
  data: Test;
}

export interface CurrentTestStore {
  currentTest: Test;
  userPoints: number;
  currentQuestion: number;
  currentAnswerPoints: number;
  actions: {
    setCurrentAnswerPoints: (answerPoints: number) => void;
    setCurrentTest: (currentTest: Test) => void;
    setUserPoints: (points: number) => void;
    setCurrentQuestion: (currentQuestion: number) => void;
  };
}
