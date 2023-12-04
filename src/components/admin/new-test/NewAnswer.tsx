import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Input } from '@shared/Input.tsx';
import { X } from 'lucide-react';
import { ChangeEvent, useId } from 'react';
import { Answer, Question } from 'types/index';

interface NewAnswerProps {
  answerIndex: number;
  currentAnswer: Answer;
  currentQuestion: Omit<Question, 'testId'>;
}

export const NewAnswer = ({ answerIndex, currentAnswer, currentQuestion }: NewAnswerProps) => {
  const answerId = useId();
  const pointsId = useId();
  const questions = useCreateNewTestStore((state) => state.questions);
  const setQuestions = useCreateNewTestStore((state) => state.actions.setQuestions);

  const handleDeleteAnswer = () => {
    setQuestions(
      questions.map((question) =>
        currentQuestion.id === question.id
          ? {
              ...question,
              answers: currentQuestion.answers.filter((answer) => answer.id !== currentAnswer.id),
            }
          : question,
      ),
    );
  };

  const handleChangeAnswerText = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = questions.map((question) =>
      question.id === currentQuestion.id
        ? {
            ...question,
            answers: currentQuestion.answers.map((answer) =>
              answer.id === currentAnswer.id ? { ...answer, answerText: e.target.value } : answer,
            ),
          }
        : question,
    );
    setQuestions(updatedQuestions);
  };

  const handleChangeAnswerPoints = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = questions.map((question) =>
      question.id === currentQuestion.id
        ? {
            ...question,
            answers: currentQuestion.answers.map((answer) =>
              answer.id === currentAnswer.id ? { ...answer, pointsForAnswer: Number(e.target.value) } : answer,
            ),
          }
        : question,
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div className='relative m-2 space-x-4 rounded-xl border-2 border-gray-50 p-4'>
      <div className='flex flex-col space-y-4 text-xl'>
        <h4 className='text-xl font-semibold'>Answer number {answerIndex + 1}</h4>
        <div className='flex items-center space-x-4'>
          <label htmlFor={answerId}>Answer:</label>
          <Input id={answerId} variant='default' inputSize='small' className='p-1' onChange={handleChangeAnswerText} />
        </div>
        <div className='flex items-center space-x-4'>
          <label htmlFor={pointsId}>Points:</label>
          <Input
            id={pointsId}
            variant='default'
            type='number'
            inputSize='small'
            className='p-1'
            onChange={handleChangeAnswerPoints}
          />
        </div>
      </div>
      <X
        className='absolute right-1 top-1 cursor-pointer rounded-lg border-2 border-red-500 bg-red-500 transition duration-200 hover:bg-red-400'
        onClick={handleDeleteAnswer}
      />
    </div>
  );
};
