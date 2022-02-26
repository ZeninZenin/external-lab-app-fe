import React, { FC, useEffect } from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import './App.styles.css';
import { AppRouter, Profile, SideMenu } from './components';
import { AppHeader } from './App.styles';
import { useLocalStorage } from 'usehooks-ts';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUserContext } from '../context';
import { isDevelopment } from '../utils';
import { axios } from '../axios';
import { User } from '../types';

const SIDER_COLLAPSED_LS_KEY = 'sider-collapsed';

const queryClient = new QueryClient();

export const App: FC = () => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useLocalStorage(
    SIDER_COLLAPSED_LS_KEY,
    false,
  );

  const {
    userContextValue: { user },
    setUserContextValue,
  } = useUserContext();

  useEffect(() => {
    if (isDevelopment && !user) {
      const getTestUser = async () => {
        const { data } = await axios.get<User>('/users/testLogin');
        setUserContextValue({ user: data });
      };

      getTestUser();
    }
  }, [setUserContextValue, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout className="app">
          <Sider
            collapsible
            collapsed={isSiderCollapsed}
            onCollapse={setIsSiderCollapsed}
          >
            <SideMenu />
          </Sider>
          <Layout>
            <AppHeader>
              <Profile />
            </AppHeader>
            <Content className="app-content">
              <AppRouter />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
