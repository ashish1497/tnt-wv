import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="flex w-full flex-row items-center justify-between border-2 p-4">
        <h1 className="font-sans font-bold">
          {/* logo */}
          <span className="text-primary-100">tag'</span>
          <span className="text-primary-300">n</span>
          <span className="text-secondary-100">trac</span>
        </h1>
        <Button
          title="Sign"
          variant="main-reverse"
          cn="text-secondary-200"
          onClick={() => navigate('/login')}
        />
      </header>
      <main className="box-border h-128 w-full border p-2 ">
        <h2 className="font-serif font-semibold">
          Tag and track order seamlessly
        </h2>
      </main>
    </>
  );
};

export default Landing;
