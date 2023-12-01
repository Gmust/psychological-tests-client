import { NewAnswer } from '@components/admin/new-test/NewAnswer.tsx';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { BadgeMinus } from 'lucide-react';
import { useId, useState } from 'react';
import { Answer, Question } from 'types/index';

interface NewQuestionProps {
  index: number;
  setNewQuestion: (updatedQuestion: Question) => void;
  removeQuestion: () => void;
}

export const NewQuestion = ({ setNewQuestion, index, removeQuestion }: NewQuestionProps) => {
  const [answers, setNewAnswer] = useState<Pick<Answer, 'pointsForAnswer' | 'answerText'>[]>([]);
  const id = useId();

  return (
    <div className='flex flex-col'>
      <div className='flex items-center space-x-4 m-2 text-xl'>
        <label htmlFor={id}>Question text:</label>
        <Input inputSize='small' id={id} />
        <BadgeMinus onClick={() => removeQuestion()} />
      </div>
      <div className='ml-10'>
        <Button
          variant='default'
          size='default'
          onClick={() =>
            setNewAnswer([
              ...answers,
              {
                answerText: '',
                pointsForAnswer: 0,
              },
            ])
          }
        >
          Add new answer
        </Button>
        <div className='flex flex-col mt-2'>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            answers.map((question, index) => (
              <NewAnswer
                key={index}
                index={index}
                setNewAnswer={(updatedAnswer: Pick<Answer, 'pointsForAnswer' | 'answerText'>) => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[index] = updatedAnswer;
                  setNewAnswer(updatedAnswers);
                }}
                removeAnswer={() => {
                  const updatedAnswers = [...answers];
                  updatedAnswers.splice(index, 1);
                  setNewAnswer(updatedAnswers);
                }}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};
