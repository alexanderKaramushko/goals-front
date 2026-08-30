import axios from 'axios';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useGetUserProfile } from 'entities/api';

export type AuthContextPayload = {
  isAuthorized: boolean;
  loading: boolean;
};

const defaultAuthPayload = {
  isAuthorized: false,
  loading: true,
};

const AuthContext = createContext<AuthContextPayload>(defaultAuthPayload);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextPayload>(defaultAuthPayload);
  const userProfile = useGetUserProfile();

  useEffect(() => {
    if (axios.isAxiosError(userProfile.error) && userProfile.error.status === 401) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth((payload) => ({
        ...payload,
        isAuthorized: false,
        loading: false,
      }));
    }

    if (userProfile.data) {
      setAuth((payload) => ({
        ...payload,
        isAuthorized: true,
        loading: false,
      }));
    }
  }, [userProfile.error, userProfile.data]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

