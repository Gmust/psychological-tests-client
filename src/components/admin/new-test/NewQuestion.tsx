import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { Minus } from 'lucide-react';
import { ChangeEvent, useId } from 'react';

interface NewQuestionProps {
  questionIndex: number;
  questionId: number;
}

export const NewQuestion = ({ questionIndex, questionId }: NewQuestionProps) => {
  const setQuestions = useCreateNewTestStore((state) => state.actions.setQuestions);
  const questions = useCreateNewTestStore((state) => state.questions);
  const id = useId();

  const handleDeleteQuestion = () => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };
  const handelChangeQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, questionText: e.target.value } : question,
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div className='flex flex-col'>
      <h4 className='text-xl font-semibold'>Question number {questionIndex + 1}</h4>
      <div className='flex items-center space-x-4 m-2 text-xl'>
        <label htmlFor={id}>Question text:</label>
        <Input inputSize='small' id={id} onChange={handelChangeQuestionText} />
        <div className='border-2 bg-red-500 border-red-500 rounded-lg cursor-pointer hover:bg-red-400 transition duration-200'>
          <Minus onClick={handleDeleteQuestion} />
        </div>
      </div>
      <div className='ml-10'>
        <Button variant='default' size='default'>
          Add new answer
        </Button>
        <div className='flex flex-col mt-2'></div>
      </div>
    </div>
  );
};
