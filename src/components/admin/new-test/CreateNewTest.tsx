import { NewQuestion } from '@components/admin/new-test/NewQuestion.tsx';
import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { useEffect, useState } from 'react';
import { Answer, Question } from 'types/index';

export const CreateNewTest = () => {
  const [questions, setNewQuestion] = useState<Pick<Question, 'questionText' | 'answers'>[]>([]);
  const setResult = useCreateNewTestStore((state) => state.actions.setResult);
  const setTotalPoints = useCreateNewTestStore((state) => state.actions.setTotalPoints);
  const setTitle = useCreateNewTestStore((state) => state.actions.setTitle);
  const a = useCreateNewTestStore((state) => state.result);
  const b = useCreateNewTestStore((state) => state.title);
  const c = useCreateNewTestStore((state) => state.totalPoints);

  useEffect(() => {
    console.log(a, b, c);
  }, [a, b, c]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md space-y-5'>
        <div className='flex flex space-x-4'>
          <div className='text-2xl flex  items-center space-x-4'>
            <label htmlFor='title'>Title: </label>
            <Input variant='default' id='title' inputSize='small' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='text-2xl flex  items-center space-x-4'>
            <label htmlFor='points'>Points for test: </label>
            <Input
              variant='default'
              id='points'
              type='number'
              inputSize='small'
              onChange={(e) => setTotalPoints(Number(e.target.value))}
            />
          </div>
        </div>
        <div className='flex text-2xl space-x-4'>
          <label htmlFor='result'>Result:</label>
          <textarea
            id='result'
            rows={4}
            className='block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Write result here...'
            onChange={(e) => setResult(e.target.value)}
          ></textarea>
        </div>
        <div>
          <Button
            variant='default'
            size='default'
            onClick={() =>
              setNewQuestion([
                ...questions,
                {
                  answers: [] as Answer[],
                  questionText: '',
                },
              ])
            }
          >
            Add new question
          </Button>
          <div className='flex flex-col divide-y divide-y-reverse'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              questions.map((question, index) => (
                <NewQuestion
                  key={index}
                  index={index}
                  setNewQuestion={(updatedQuestion) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index] = updatedQuestion;
                    setNewQuestion(updatedQuestions);
                  }}
                  removeQuestion={() => {
                    const updatedQuestions = [...questions];
                    updatedQuestions.splice(index, 1);
                    setNewQuestion(updatedQuestions);
                  }}
                />
              ))
            }
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='default'
            size='lg'
            className='bg-emerald-500 hover:bg-emerald-700'
            disabled={questions.length < 2}
          >
            Create Test
          </Button>
        </div>
      </div>
    </div>
  );
};
