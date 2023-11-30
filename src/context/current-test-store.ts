import { Test } from 'types/index';
import { CurrentTestStore } from 'types/tests.ts';
import { create } from 'zustand';

export const useCurrentTestStore = create<CurrentTestStore>((set, get) => ({
  currentQuestion: 1,
  currentTest: {} as Test,
  userPoints: 0,
  actions: {
    setCurrentTest: (currentTest: Test) =>
      set({
        currentTest,
      }),
    setCurrentQuestion: (currentQuestion: number) =>
      set({
        currentQuestion,
      }),
    setUserPoints: (points: number) => {
      set({
        userPoints: get().userPoints + points,
      });
    },
  },
}));
