import { Question, Test } from './index';

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

export interface PassTestRequest {
  userId: number;
  testId: number;
}

export interface PassTestResponse {
  status: boolean;
  message: string;
}

export interface CreateTestResponse {
  message: string;
  test: Test;
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

export interface CreateNewTestStore extends Omit<Test, 'id'> {
  actions: {
    setTitle: (title: string) => void;
    setResult: (result: string) => void;
    setTotalPoints: (totalPoints: number) => void;
    setQuestions: (questions: Omit<Question, 'testId'>[]) => void;
    calculateTotalPoints: (questions: Omit<Question, 'testId'>[]) => number;
    createNewTest: () => Promise<CreateTestResponse>;
  };
}
