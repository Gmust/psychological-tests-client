import { NewQuestion } from '@components/admin/new-test/NewQuestion.tsx';
import { useCreateNewTestStore } from '@context/create-new-test-store.ts';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { customAlphabet } from 'nanoid';

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
    setQuestions([
      ...questions,
      {
        questionText: '',
        answers: [],
        id: Number(nanoid()),
      },
    ]);
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='space-y-5 rounded-md bg-white p-6'>
        <h2 className='mb-4 text-center text-4xl font-semibold'>Create new tests</h2>
        <div className='flex  space-x-4'>
          <div className='flex items-center  space-x-4 text-2xl'>
            <label htmlFor='title'>Title: </label>
            <Input variant='default' id='title' inputSize='small' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='flex items-center  space-x-4 text-2xl'>
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
        <div className='flex space-x-4 text-2xl'>
          <label htmlFor='result'>Result:</label>
          <textarea
            id='result'
            rows={4}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900 focus:ring'
            placeholder='Write result here...'
            onChange={(e) => setResult(e.target.value)}
          />
        </div>
        <div>
          <Button variant='default' size='default' onClick={handleAddNewQuestion}>
            Add new question
          </Button>
          <div className='mt-2 flex flex-col divide-y'>
            <div></div>
            {questions.map((question, index) => (
              <NewQuestion key={question.id} currentQuestion={question!} questionIndex={index} />
            ))}
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='default'
            size='lg'
            className='bg-emerald-500 hover:bg-emerald-700'
            disabled={
              questions.length < 2 ||
              title == '' ||
              result == '' ||
              totalPoints < 2 ||
              questions.some(
                (question) =>
                  question.answers.length === 0 || question.answers.every((answer) => answer.answerText.trim() === ''),
              )
            }
          >
            Create Test
          </Button>
        </div>
      </div>
    </div>
  );
};
