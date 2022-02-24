import { Form, Input, Modal } from 'antd';
import { axios } from '../../axios';
import { pick } from 'lodash-es';
import React, { FC } from 'react';
import { User } from '../../types';

export const UpdateProfileModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  user?: User | null;
}> = ({ setIsVisible, isVisible, user }) => {
  const [form] = Form.useForm<Pick<User, 'firstName' | 'lastName'>>();

  return (
    <Modal
      title={`Редактирование профиля (${user?.login})`}
      visible={isVisible}
      destroyOnClose
      okText="Сохранить"
      cancelText="Отмена"
      onCancel={() => setIsVisible(false)}
      onOk={async () => {
        const values = await form.validateFields();

        if (
          values.firstName === user?.firstName &&
          values.lastName === user?.lastName
        ) {
          setIsVisible(false);
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
        <Form.Item name="lastName" label="Фамилия" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
