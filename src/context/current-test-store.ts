import { Test } from 'types/index';
import { CurrentTestStore } from 'types/tests.ts';
import { create } from 'zustand';

export const useCurrentTestStore = create<CurrentTestStore>((set, get) => ({
  currentQuestion: 1,
  currentTest: {} as Test,
  userPoints: 0,
  currentAnswerPoints: 0,
  actions: {
    setCurrentTest: (currentTest: Test) =>
      set({
        currentTest,
      }),
    setCurrentQuestion: (currentQuestion: number) =>
      set((state) => ({
        ...state,
        currentQuestion,
      })),
    setUserPoints: (points: number) => {
      set({
        userPoints: get().userPoints + points,
      });
    },
    setCurrentAnswerPoints: (answerPoints: number) => {
      set({
        currentAnswerPoints: answerPoints,
      });
    },
  },
}));
