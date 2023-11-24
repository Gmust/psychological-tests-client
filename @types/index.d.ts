import { LucideIcon } from 'lucide-react';

export interface Router {
  path: string;
  label: string;
  Icon: LucideIcon;
}

export interface User {
  id: number;
  name: string;
  email: string;
  passedTests: Omit<Test, 'questions'>[];
  role: 'admin' | 'user';
}

export interface Test {
  id: number;
  result: string;
  title: string;
  totalPoints: number;
  questions: Question[];
}

export interface Question {
  id: number;
  testId: number;
  questionText: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  answerText: string;
  pointsForAnswer: number;
  questionId: number;
}
