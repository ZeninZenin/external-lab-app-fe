import React from 'react';
import {
  BookOutlined,
  CalendarOutlined,
  ContainerOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';

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
  const { user } = useCurrentUser();

  const isGuest = user?.roles?.includes('guest');
  const isAdmin = user?.roles?.includes('admin');
  const isTrainer = user?.roles?.includes('trainer');

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <LogoContainer>
        <LogoStyled />
      </LogoContainer>
      {!isGuest && (
        <Menu.Item icon={<UserOutlined />}>
          <Link to={'/profile'}>Profile</Link>
        </Menu.Item>
      )}
      <Menu.Item icon={<CalendarOutlined />}>
        <Link to={'/calendar'}>Calendar</Link>
      </Menu.Item>
      {(isAdmin || isTrainer) && (
        <Menu.Item icon={<UnorderedListOutlined />}>
          <Link to={'/tasks-management'}>Tasks management</Link>
        </Menu.Item>
      )}
      {(isAdmin || isTrainer) && (
        <Menu.Item icon={<BookOutlined />}>
          <Link to={'/lectures-management'}>Lectures management</Link>
        </Menu.Item>
      )}
      {(isAdmin || isTrainer) && (
        <Menu.Item icon={<UsergroupAddOutlined />}>
          <Link to={'/users-list'}>Users</Link>
        </Menu.Item>
      )}
      {(isAdmin || isTrainer) && (
        <Menu.Item icon={<TeamOutlined />}>
          <Link to={'/my-group'}>My group</Link>
        </Menu.Item>
      )}
      {(isAdmin || isTrainer) && (
        <Menu.Item icon={<ContainerOutlined />}>
          <Link to={'/dashboard'}>Dashboard</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};
