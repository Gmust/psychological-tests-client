import { NewQuestion } from '@components/admin/new-test/NewQuestion.tsx';
import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { customAlphabet, nanoid } from 'nanoid';

export const CreateNewTest = () => {
  const setResult = useCreateNewTestStore((state) => state.actions.setResult);
  const setTotalPoints = useCreateNewTestStore((state) => state.actions.setTotalPoints);
  const setQuestions = useCreateNewTestStore((state) => state.actions.setQuestions);
  const setTitle = useCreateNewTestStore((state) => state.actions.setTitle);
  const title = useCreateNewTestStore((state) => state.title);
  const totalPoints = useCreateNewTestStore((state) => state.totalPoints);
  const result = useCreateNewTestStore((state) => state.result);
  const questions = useCreateNewTestStore((state) => state.questions);
  const nanoid = customAlphabet('1234567890', 10);
  const handleAddNewQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: [], id: Number(nanoid()) }]);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md space-y-5'>
        <h2 className='text-center text-4xl font-semibold mb-4'>Create new tests</h2>
        <div className='flex  space-x-4'>
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
              min='0'
              max='1000'
              onChange={(e) => setTotalPoints(Number(e.target.value))}
            />
          </div>
        </div>
        <div className='flex text-2xl space-x-4'>
          <label htmlFor='result'>Result:</label>
          <textarea
            id='result'
            rows={4}
            className='block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring'
            placeholder='Write result here...'
            onChange={(e) => setResult(e.target.value)}
          />
        </div>
        <div>
          <Button variant='default' size='default' onClick={handleAddNewQuestion}>
            Add new question
          </Button>
          <div className='flex flex-col divide-y mt-2'>
            <div></div>
            {questions.map((question, index) => (
              <NewQuestion questionId={question.id!} key={question.id} questionIndex={index} />
            ))}
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='default'
            size='lg'
            className='bg-emerald-500 hover:bg-emerald-700'
            disabled={questions.length < 2 && title == '' && result == '' && totalPoints <= 0}
          >
            Create Test
          </Button>
        </div>
      </div>
    </div>
  );
};
