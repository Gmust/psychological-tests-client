import { useParams } from 'react-router-dom';

export const TestPage = () => {
  const params = useParams();

  console.log(params);

  return <div>Test</div>;
};
