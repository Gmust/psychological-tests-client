import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Input } from '@shared/Input.tsx';
import { BadgeMinus } from 'lucide-react';
import { useId } from 'react';
import { Answer } from 'types/index';

interface NewAnswerProps {
  removeAnswer: () => void;
  setNewAnswer: (updatedAnswer: Pick<Answer, 'pointsForAnswer' | 'answerText'>) => void;
  index: number;
  answers: Pick<Answer, 'pointsForAnswer' | 'answerText'>[];
}

export const NewAnswer = ({ answers, removeAnswer, setNewAnswer, index }: NewAnswerProps) => {
  const answerId = useId();
  const pointsId = useId();
  const setQuestions = useCreateNewTestStore((state) => state.actions.setQuestions);

  const handleAnswerTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswer = {
      answerText: e.target.value,
      pointsForAnswer: answers[index].pointsForAnswer,
    };
    setNewAnswer(updatedAnswer);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswer = {
      answerText: answers[index].answerText,
      pointsForAnswer: Number(e.target.value),
    };
    setNewAnswer(updatedAnswer);
  };
  return (
    <div className='flex space-x-4 items-center mt-5'>
      <div className='flex flex-col space-y-4 text-xl'>
        <div className='flex items-center space-x-4'>
          <label htmlFor={answerId}>Answer Text:</label>
          <Input
            id={answerId}
            variant='default'
            inputSize='small'
            className='p-1'
            value={answers[index].answerText}
            onChange={handleAnswerTextChange}
          />
        </div>
        <div className='flex items-center space-x-4'>
          <label htmlFor={pointsId}>Points:</label>
          <Input
            id={pointsId}
            variant='default'
            type='number'
            inputSize='small'
            className='p-1'
            value={answers[index].pointsForAnswer}
            onChange={handlePointsChange}
          />
        </div>
      </div>
      <BadgeMinus onClick={() => removeAnswer()} />
    </div>
  );
};
