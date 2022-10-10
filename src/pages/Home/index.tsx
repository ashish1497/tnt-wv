import Landing from '../../components/Landing';
import { useAuthContext } from '../../contexts/AuthContext.js';

const Home = () => {
  // here I want to segregate
  // const { loggedIn, user } = useAuthContext()!;

  // if (!loggedIn || !user) {
  //   return <>Landing Comp</>;
  // }

  // if (user.type === 'admin') {
  //   return <>Admin Page</>;
  // }

  // if (user.type === 'delivery') {
  //   return <>Delivery Page</>;
  // }

  // if (user.type === 'user') {
  //   return <>User Page</>;
  // }

  return <Landing />;
};

export default Home;
