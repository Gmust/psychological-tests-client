import { Menu, Transition } from '@headlessui/react';
import { Button } from '@shared/Button.tsx';
import { cn } from '@utils/libs.ts';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserIconPops {
  email: string;
  userId: number;
}

export const UserIcon = ({ email, userId }: UserIconPops) => {
  return (
    <div className='flex items-center justify-center '>
      <div className='relative inline-block text-left'>
        <Menu>
          {({ open }) => (
            <>
              <span className='rounded-md shadow-sm'>
                <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'>
                  <Link to={`/user/${userId}`}>
                    <User size={30} />
                  </Link>
                </Menu.Button>
              </span>
              <Transition
                show={open}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  static
                  className='absolute text-gray-900 right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                >
                  <div className='px-4 py-3'>
                    <p className='text-sm  leading-5'>Signed in as</p>
                    <p className='text-sm font-medium leading-5 text-gray-900 truncate'>{email}</p>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/user/${userId}`}
                          className={cn('flex justify-between w-full px-4 py-2 text-sm leading-5 text-left', {
                            'bg-gray-100 text-gray-900': active,
                          })}
                        >
                          Account
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className=''>
                    <Menu.Item
                      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                      // @ts-expect-error
                      className='flex items-center w-full'
                    >
                      <Button variant='default' size='default'>
                        Logout
                      </Button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};
