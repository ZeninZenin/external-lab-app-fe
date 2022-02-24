import noop from 'lodash-es/noop';
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { User } from '../types';
import { getJWTPayload } from '../utils';

interface UserContextValue {
  userContextValue: {
    user: User | null | undefined;
  };
  setUserContextValue: Dispatch<
    SetStateAction<UserContextValue['userContextValue']>
  >;
}

const UserContext = createContext<UserContextValue>({
  userContextValue: { user: null },
  setUserContextValue: noop,
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: FC = ({ children }) => {
  const [userContextValue, setUserContextValue] = useState<
    UserContextValue['userContextValue']
  >({
    user: getJWTPayload(localStorage.getItem('token'))?.user,
  });

  const contextValue = useMemo<UserContextValue>(
    () => ({ userContextValue, setUserContextValue }),
    [userContextValue],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
