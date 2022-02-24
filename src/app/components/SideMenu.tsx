import React from 'react';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 18px;
`;

const LogoStyled = styled(Logo)`
  width: 100%;
  height: auto;
  max-width: 60px;
`;

export const SideMenu = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <LogoContainer>
        <LogoStyled />
      </LogoContainer>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to={'/profile'}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        <Link to={'/calendar'}>Calendar</Link>
      </Menu.Item>
    </Menu>
  );
};
