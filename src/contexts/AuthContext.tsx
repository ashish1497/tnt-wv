import {
  FC,
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import decodeJwt from 'jwt-decode';

import {
  authenticate,
  isAuth,
  LoginResponseData,
  unauthenticate,
} from '../helpers/auth';
import { getCookie } from '../helpers/storage';
import { COOKIES } from '../const';
import { AccessTokenInterface } from 'types';

interface AuthContextInterface {
  loggedIn: boolean;
  user: AccessTokenInterface;
  loginHandler: (data: LoginResponseData, to: string) => void;
  logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<AccessTokenInterface>({
    firstName: '',
    lastName: '',
    type: 'user',
    userId: '',
    userName: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    isAuth()
      .then(async (res: boolean) => {
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

  const loginHandler = (data: LoginResponseData, to: string) => {
    authenticate(data, async () => {
      let token = getCookie(COOKIES.ACCESSTOKEN);
      if (token && getCookie(token)) {
        setLoggedIn(true);
        const decoded: AccessTokenInterface = decodeJwt(token);
        const { firstName, lastName, type, userId, userName } = decoded;
        setUser({
          ...user,
          firstName: firstName,
          lastName: lastName,
          type: type,
          userId: userId,
          userName: userName,
        });
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
    user,
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
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error(`useAuthContext must be called within AuthProvider`);
  }
  return context;
};

export { AuthContext, AuthProvider };
