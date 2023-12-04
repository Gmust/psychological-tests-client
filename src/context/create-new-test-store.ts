import toast from 'react-hot-toast';
import { Question, Test } from 'types/index';
import { CreateNewTestStore } from 'types/tests.ts';
import { create } from 'zustand';

import { TestsService } from '../services/testsService.ts';

export const useCreateNewTestStore = create<CreateNewTestStore>((set, get) => ({
  questions: [],
  totalPoints: 0,
  title: '',
  result: '',
  actions: {
    createNewTest: async () => {
      try {
        const newData = get().questions.map(({ id, ...questionRest }) => ({
          ...questionRest,
          answers: questionRest.answers.map(({ id, questionId, ...answerRest }) => answerRest),
        }));
        const { test, message } = await TestsService.createNewTest({
          totalPoints: get().totalPoints,
          result: get().result,
          title: get().title,
          questions: newData,
        });
        return {
          test,
          message,
        };
      } catch (e) {
        console.log(e);
      }
    },
    calculateTotalPoints: (questions: Omit<Question, 'testId'>[]) => {
      return questions.reduce((acc, question) => {
        const questionPoints = question.answers.reduce((points, answer) => points + answer.pointsForAnswer, 0);
        return acc + questionPoints;
      }, 0);
    },
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
