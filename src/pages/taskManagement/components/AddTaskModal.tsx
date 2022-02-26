import { DatePicker, Form, Input, Modal } from 'antd';
import { axios } from 'src/axios';

import React, { FC } from 'react';
import { Task } from '../../../types';
import { useMutation } from 'react-query';

export const AddTaskModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  onAdd(): void;
}> = ({ setIsVisible, isVisible }) => {
  const [form] = Form.useForm<Omit<Task, '_id'>>();

  const { mutate } = useMutation<Omit<Task, '_id'>, unknown, Omit<Task, '_id'>>(
    taskPayload => {
      return axios.post(`/tasks`, taskPayload);
    },
  );

  return (
    <Modal
      title={'Add new task'}
      visible={isVisible}
      destroyOnClose
      okText="Save"
      cancelText="Cancel"
      onCancel={() => setIsVisible(false)}
      onOk={async () => {
        const values = await form.validateFields();

        await mutate(values);

        setIsVisible(false);
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};
