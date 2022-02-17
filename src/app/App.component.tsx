import React, { FC } from 'react';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import './App.styles.css';
import { AppRouter } from './components';

export const App: FC = () => {
  return (
    <Layout className="app">
      <Header>header</Header>
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
