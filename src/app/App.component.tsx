import React, { FC } from 'react';
import { Avatar, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import './App.styles.css';
import { AppRouter } from './components';
import { useUserContext } from '../context';
import Text from 'antd/es/typography/Text';

export const App: FC = () => {
  const { userContextValue } = useUserContext();
  const { user } = userContextValue;

  const userName =
    user?.lastName && user?.firstName
      ? `${user.firstName} ${user.lastName}`
      : user?.githubName;

  const nameToShow = userName || user?.login;

  return (
    <Layout className="app">
      <Header>
        <div className="app-header-content">
          <Avatar>{nameToShow?.slice(0, 1)}</Avatar>
          <Text className="profile-text">{nameToShow}</Text>
        </div>
      </Header>
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
