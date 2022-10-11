import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui';

const Header = () => {
  const { loggedIn, logoutHandler } = useAuthContext();

  const navigate = useNavigate();
  return (
    <header className="flex w-full flex-row items-center justify-between border-2 p-4">
      <h1 className="font-sans font-bold text-2xl">
        {/* logo */}
        <span className="text-primary-100 hover:contrast-150">tag'</span>
        <span className="text-primary-300">n</span>
        <span className="text-secondary-100">trac</span>
      </h1>
      {!loggedIn && (
        <Button
          title="sign in"
          variant="main-reverse"
          cn="text-secondary-200"
          onClick={() => navigate('/login')}
        />
      )}
      {loggedIn && (
        <Button
          title="Sign Out"
          variant="main"
          cn="text-secondary-200"
          onClick={() => logoutHandler()}
        />
      )}
    </header>
  );
};

export default Header;
