import { BookCheck, Brain, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <section>
      <div className='h-screen flex justify-center'>
        <section
          className='flex flex-col items-center text-5xl font-bold text-white max-w-6xl mt-20 leading-relaxed text-center'>
          <div className='flex  max-w-4xl text-6xl'>
            <h1>Welcome to the Best Psychological Tests website!</h1>
          </div>
          <h2>Our tests were created by the best psychologists.</h2>
          <h2>
            To immerse yourself in exciting tests, you must <Link to='login'
                                                                  className='font-medium text-amber-300  hover:underline'>login</Link> to
            your
            account or <Link to='registration'
                             className='font-medium text-amber-300  hover:underline'>register
            !</Link>
          </h2>
          <div className='flex justify-between text-xl text-gray-100 mt-10 space-x-10 '>
            <div className='flex flex-col items-center'>
              <BookCheck />
              <h3>Check your identity</h3>
            </div>
            <div className='flex flex-col items-center'>
              <Brain />
              <h3>Improve your brain work</h3>
            </div>
            <div className='flex flex-col items-center'>
              <Globe />
              <h3>Explore world wide tests</h3>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
