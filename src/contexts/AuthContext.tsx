import {
  FC,
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { authenticate, isAuth, unauthenticate } from '../helpers/auth';
import { getLocalStorage, getCookie } from '../helpers/storage';
import { COOKIES, STORAGE } from '../const';

const AuthContext = createContext<any>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    isAuth()
      .then(async (res: unknown) => {
        setLoggedIn(res);
        setLoading(false);
      })
      .catch(() => {
        setLoggedIn(false);
        setLoading(false);
      });

    return () => {
      setLoggedIn(false);
      setLoading(true);
    };
  }, []);

  const loginHandler = (data: any, to: any) => {
    authenticate(data, async () => {
      if (getCookie(COOKIES.ACCESSTOKEN)) {
        setLoggedIn(true);
        navigate(to && to.length > 0 ? to : '/', { replace: true });
      }
    });
  };

  const logoutHandler = () => {
    unauthenticate(() => {
      setLoggedIn(false);
      navigate('/login', { replace: true });
    });
  };

  const context = {
    loggedIn,
    loginHandler,
    logoutHandler,
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
