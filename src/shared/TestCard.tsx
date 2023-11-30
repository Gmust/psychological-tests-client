import { Link } from 'react-router-dom';
import { Test } from 'types/index';

interface TestCardProps {
  test: Test;
}

export const TestCard = ({ test }: TestCardProps) => {
  return (
    <Link to={`test/${test.id}`}>
      <div className='flex m-4 p-3 flex-col border-gray-100 border-2 rounded-md text-xl cursor-pointer hover:scale-105 transition duration-200 hover:border-gray-200  '>
        <h4>{test.title}</h4>
        <p>Total questions: {test.questions.length} </p>
        <p>Total points: {test.totalPoints}</p>
      </div>
    </Link>
  );
};
