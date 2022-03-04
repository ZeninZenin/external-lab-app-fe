import React, { FC } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import './App.styles.css';
import { AppRouter, Profile, SideMenu } from './components';
import { AppHeader } from './App.styles';
import { useLocalStorage } from 'usehooks-ts';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const SIDER_COLLAPSED_LS_KEY = 'sider-collapsed';

const queryClient = new QueryClient();

export const App: FC = () => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useLocalStorage(
    SIDER_COLLAPSED_LS_KEY,
    false,
  );

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
