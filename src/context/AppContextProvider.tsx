import React, { FC } from 'react';
import { UserContextProvider } from './userContext';

export const AppContextProvider: FC = ({ children }) => (
  <UserContextProvider>{children}</UserContextProvider>
);
