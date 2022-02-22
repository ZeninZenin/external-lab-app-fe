import React, { FC, useState } from 'react';
import { Avatar, Dropdown, Form, Input, Menu, Modal, Tooltip } from 'antd';
import { useUserContext } from '../../../context';
import { ProfileRoot, ProfileText } from './Profile.styles';
import { pick } from 'lodash-es';
import { User } from '../../../types';
import { axios } from '../../../axios';

export const Profile: FC = () => {
  const { userContextValue } = useUserContext();
  const { user } = userContextValue;
  const [isEditModalVisible, setEditModalVisibleState] = useState(false);
  const [form] = Form.useForm<Pick<User, 'firstName' | 'lastName'>>();

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
      <Modal
        title={`Редактирование профиля (${user?.login})`}
        visible={isEditModalVisible}
        destroyOnClose
        okText="Сохранить"
        cancelText="Отмена"
        onCancel={() => setEditModalVisibleState(false)}
        onOk={async () => {
          const values = await form.validateFields();

          if (
            values.firstName === user?.firstName &&
            values.lastName === user?.lastName
          ) {
            setEditModalVisibleState(false);
            return;
          }

          await axios.put(`/users/${user?.login}/update-name`, values);
          localStorage.removeItem('token');
          location.reload();
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
          initialValues={pick(user, 'firstName', 'lastName')}
        >
          <Form.Item name="firstName" label="Имя" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Фамилия"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
