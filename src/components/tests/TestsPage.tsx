import { TestCard } from '@shared/TestCard.tsx';
import { ArrowLeft, ArrowRight, Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TestsResponse } from 'types/tests.ts';

import { TestsService } from '../../services/testsService.ts';

export const TestsPage = () => {
  const [testsResponse, setTestsResponse] = useState<TestsResponse | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getTests = async () => {
      try {
        const response = await TestsService.getTests({ page });
        setTestsResponse(response);
      } catch (e) {
        toast.error('Something gonna wrong');
      }
    };
    getTests();
  }, [page]);

  const handleNextPage = () => {
    if (page !== testsResponse?.total) {
      setPage((prevState) => prevState + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page !== 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center  '>
      <div className='bg-white max-w-lg p-6 rounded-md m-10'>
        <h2 className='text-center text-3xl font-semibold'>Tests</h2>
        {testsResponse ? (
          <div className='flex flex-wrap '>
            {testsResponse.data.map((test) => (
              <TestCard test={test} key={test.id} />
            ))}
          </div>
        ) : (
          <Loader2Icon className='animate-spin w-20 h-20 text-amber-500' />
        )}
        <div className='flex justify-around'>
          <ArrowLeft className='h-8 w-8 cursor-pointer' onClick={handlePreviousPage} />
          <ArrowRight className='h-8 w-8 cursor-pointer' onClick={handleNextPage} />
        </div>
      </div>
    </div>
  );
};
