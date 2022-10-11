import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="box-border h-128 w-full border p-2 ">
        <h2 className="font-serif font-semibold">
          Tag and track order seamlessly
        </h2>
      </main>
    </>
  );
};

export default Landing;
