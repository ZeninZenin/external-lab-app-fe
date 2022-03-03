import React, { FC, useState } from 'react';
import { Avatar, Dropdown, Menu, Tooltip } from 'antd';
import { ProfileRoot, ProfileText } from './Profile.styles';
import { UpdateProfileModal } from '../UpdateProfileModal';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';

export const Profile: FC = () => {
  const { user } = useCurrentUser();
  const [isEditModalVisible, setEditModalVisibleState] = useState(false);

  const userName =
    user?.lastName && user?.firstName
      ? `${user.firstName} ${user.lastName}`
      : user?.githubName;

  const nameToShow = userName || user?.login;

  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            <Tooltip title="Редактировать профиль" placement="left">
              <Menu.Item onClick={() => setEditModalVisibleState(true)}>
                Редактировать
              </Menu.Item>
            </Tooltip>
          </Menu>
        }
      >
        <Tooltip title="Меню профиля" placement="left" color="#2a3f53">
          <ProfileRoot>
            <Avatar>{nameToShow?.slice(0, 1)}</Avatar>
            <ProfileText>{nameToShow}</ProfileText>
          </ProfileRoot>
        </Tooltip>
      </Dropdown>
      <UpdateProfileModal
        user={user}
        setIsVisible={setEditModalVisibleState}
        isVisible={isEditModalVisible}
      />
    </>
  );
};
