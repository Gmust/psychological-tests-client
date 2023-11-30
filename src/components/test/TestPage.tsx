import { StartTest } from '@components/test/StartTest.tsx';
import { useCurrentTestStore } from '@context/current-test-store.ts';
import { Step, Stepper } from 'headless-stepper/components';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { TestsService } from '../../services/testsService.ts';

export const TestPage = () => {
  const params = useParams();
  const setCurrentTest = useCurrentTestStore((state) => state.actions.setCurrentTest);
  const currentTest = useCurrentTestStore((state) => state.currentTest);

  useEffect(() => {
    const getTest = async () => {
      try {
        const { data } = await TestsService.getTest({ id: Number(params.id) });
        setCurrentTest(data);
      } catch (e) {
        toast.error('Something went wrong!');
      }
    };

    getTest();
  }, []);

  return (
    <>
      <StartTest />

      <div className='h-screen flex items-center justify-center'>
        {currentTest.id && (
          <div className='bg-white'>
            <Stepper>
              {currentTest.questions.map((question, index) => (
                <Step
                  label={index.toString()}
                  key={question.id}
                  as='button'
                  className=' text-4xl space-x-10 border-gray-200 border-2'
                >
                  <div>
                    <p className='flex flex-wrap text-2xl max-w-6xl'>{question.questionText}</p>
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        )}
      </div>
    </>
  );
};
