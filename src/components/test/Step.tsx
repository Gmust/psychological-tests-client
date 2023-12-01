import { useCurrentTestStore } from '@context/current-test-store.ts';
import { RadioGroup } from '@headlessui/react';
import { cn } from '@utils/libs.ts';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Answer, Question } from 'types/index';

export const Step = (question: Question) => {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const setCurrentAnswerPoints = useCurrentTestStore((state) => state.actions.setCurrentAnswerPoints);

  useEffect(() => {});

  return (
    <div className='mt-10'>
      <p className='flex flex-wrap text-2xl max-w-6xl'>{question.questionText}</p>
      <RadioGroup
        value={answer}
        onChange={(answer: Answer) => {
          setAnswer(answer);
          setCurrentAnswerPoints(answer.pointsForAnswer);
        }}
      >
        <RadioGroup.Label className='sr-only'>Answers for current question</RadioGroup.Label>
        <div className='space-y-4 mt-4'>
          {question.answers.map((answer) => (
            <RadioGroup.Option
              key={answer.id}
              value={answer}
              className={({ active, checked }) =>
                cn('border-gray-200  border-2 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md', {
                  'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300': active,
                  'bg-sky-900/75 text-white': checked,
                })
              }
            >
              {({ checked }) => (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='text-lg'>
                        <RadioGroup.Label
                          as='p'
                          className={cn('font-medium text-gray-900 flex flex-wrap max-w-screen-lg align-middle', {
                            'text-white': checked,
                          })}
                        >
                          {answer.answerText}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className='shrink-0 text-white'>
                        <CheckIcon className='h-6 w-6' />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
