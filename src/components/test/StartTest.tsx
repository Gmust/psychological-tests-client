import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@shared/Button.tsx';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StartTest = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const cancelTest = () => {
    navigate(-1);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='text-2xl  font-medium leading-6 text-gray-900'>
                  Are you ready to start test?
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-xl text-gray-500'>
                    When you click 'Yes' test begins, if ypu press 'No' you will be redirected back
                  </p>
                </div>

                <div className='flex justify-around mt-4'>
                  <Button variant='ghost' size='lg' onClick={closeModal}>
                    Yes
                  </Button>
                  <Button variant='ghost' size='lg' onClick={cancelTest}>
                    No
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
