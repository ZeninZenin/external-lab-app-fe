import React, { FC } from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import './App.styles.css';
import { AppRouter, Profile } from './components';
import { AppHeader } from './App.styles';

export const App: FC = () => {
  return (
    <Layout className="app">
      <AppHeader>
        <Profile />
      </AppHeader>
      <Layout>
        <Sider collapsed>left sidebar</Sider>
        <Content className="app-content">
          <AppRouter />
        </Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};
