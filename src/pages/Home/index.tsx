import Header from 'components/Header';
import Landing from 'components/Landing';
import User from 'components/User';
import { useAuthContext } from 'contexts/AuthContext';

const Home = () => {
  // here I want to segregate
  const { loggedIn, user } = useAuthContext();

  return (
    <>
      <Header />
      {!loggedIn || !user ? (
        <Landing />
      ) : user?.type === 'admin' ? (
        'Admin'
      ) : user?.type === 'delivery' ? (
        'Delivery'
      ) : user?.type === 'user' ? (
        <User />
      ) : null}
    </>
  );
};

export default Home;
