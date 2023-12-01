import { Tab } from '@headlessui/react';
import { cn } from '@utils/libs.ts';
import { Test } from 'types/index';

interface UserPassedTestsProps {
  tests: Omit<Test, 'questions'>[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const UserPassedTests = ({ tests }: UserPassedTestsProps) => {
  return (
    <div className='w-full py-1 '>
      <Tab.Group>
        <Tab.List className='flex flex-wrap max-w-xl space-x-1 rounded-xl border-gray-100 border-2'>
          {tests.map((test, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-amber-500 text-md font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  {
                    'text-black hover:bg-white/[0.12] hover:text-amber-400': !selected,
                  },
                )
              }
            >
              {test.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2 border-gray-100 border-2 rounded-md '>
          {tests.map((test, index) => (
            <Tab.Panel
              key={index}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <div className='relative rounded-md p-3 hover:bg-gray-100'>
                <p className='mt-1 flex space-x-1 text-md font-normal  text-gray-900'>{test.result}</p>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
