import { StartTest } from '@components/test/StartTest.tsx';
import { Step } from '@components/test/Step.tsx';
import { useCurrentTestStore } from '@context/current-test-store.ts';
import { Button } from '@shared/Button.tsx';
import Stepper from 'awesome-react-stepper';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { TestsService } from '../../services/testsService.ts';

export const TestPage = () => {
  const params = useParams();
  const setCurrentTest = useCurrentTestStore((state) => state.actions.setCurrentTest);
  const setUserPoints = useCurrentTestStore((state) => state.actions.setUserPoints);
  const currentTest = useCurrentTestStore((state) => state.currentTest);
  const currentAnswerPoints = useCurrentTestStore((state) => state.currentAnswerPoints);

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
          <div className='bg-white p-6'>
            <Stepper
              activeColor='#f6b26b'
              onContinue={() => {
                setUserPoints(currentAnswerPoints);
              }}
              continueBtn={
                <Button variant='default' size='lg'>
                  Next
                </Button>
              }
              backBtn={
                <Button variant='default' size='lg'>
                  Previous
                </Button>
              }
              submitBtn={
                <Button variant='default' size='lg' className='bg-emerald-500'>
                  Pass
                </Button>
              }
            >
              {currentTest.questions.map((question) => (
                <Step {...question} key={question.id} />
              ))}
            </Stepper>
          </div>
        )}
      </div>
    </>
  );
};
