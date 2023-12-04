import { NewAnswer } from '@components/admin/new-test/NewAnswer.tsx';
import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { Minus } from 'lucide-react';
import { customAlphabet } from 'nanoid';
import { ChangeEvent, useId } from 'react';
import { Question } from 'types/index';

interface NewQuestionProps {
  questionIndex: number;
  currentQuestion: Omit<Question, 'testId'>;
}

export const NewQuestion = ({ questionIndex, currentQuestion }: NewQuestionProps) => {
  const setQuestions = useCreateNewTestStore((state) => state.actions.setQuestions);
  const questions = useCreateNewTestStore((state) => state.questions);
  const id = useId();
  const nanoid = customAlphabet('1234567890', 10);

  const handleDeleteQuestion = () => {
    setQuestions(questions.filter((q) => q.id !== currentQuestion.id));
  };

  const handelChangeQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = questions.map((question) =>
      question.id === currentQuestion.id
        ? {
            ...question,
            questionText: e.target.value,
          }
        : question,
    );
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = () => {
    setQuestions(
      questions.map((question) =>
        question.id === currentQuestion.id
          ? {
              ...question,
              answers: [
                ...question.answers,
                {
                  id: Number(nanoid()),
                  answerText: '',
                  pointsForAnswer: 0,
                  questionId: currentQuestion.id!,
                },
              ],
            }
          : question,
      ),
    );
  };

  return (
    <div className='flex flex-col'>
      <h4 className='text-xl font-semibold'>Question number {questionIndex + 1}</h4>
      <div className='m-2 flex items-center space-x-4 text-xl'>
        <label htmlFor={id}>Question text:</label>
        <Input inputSize='small' id={id} onChange={handelChangeQuestionText} />
        <div className='cursor-pointer rounded-lg border-2 border-red-500 bg-red-500 transition duration-200 hover:bg-red-400'>
          <Minus onClick={handleDeleteQuestion} />
        </div>
      </div>
      <div className='ml-10'>
        <Button variant='default' size='default' onClick={handleAddAnswer}>
          Add new answer
        </Button>
        <div className='mt-2 flex max-w-4xl flex-wrap items-center justify-start'>
          {currentQuestion.answers.map((answer, index) => (
            <NewAnswer key={answer.id} answerIndex={index} currentAnswer={answer} currentQuestion={currentQuestion} />
          ))}
        </div>
      </div>
    </div>
  );
};
