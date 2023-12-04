import { Question } from 'types/index';
import { CreateNewTestStore } from 'types/tests.ts';
import { create } from 'zustand';

export const useCreateNewTestStore = create<CreateNewTestStore>((set, get) => ({
  questions: [],
  totalPoints: 0,
  title: '',
  result: '',
  actions: {
    setQuestions: (questions: Omit<Question, 'testId'>[]) =>
      set({
        questions,
      }),
    setResult: (result: string) =>
      set({
        result,
      }),
    setTitle: (title: string) =>
      set({
        title,
      }),
    setTotalPoints: (totalPoints: number) =>
      set({
        totalPoints,
      }),
  },
}));
