import { DatePicker, Form, Input, Modal } from 'antd';
import { axios } from 'src/axios';

import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { Lecture } from 'src/types';

export const AddLectureModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  onAdd(): void;
}> = ({ setIsVisible, isVisible, onAdd }) => {
  const [form] = Form.useForm<Omit<Lecture, '_id'>>();

  const { mutate } = useMutation<
    Omit<Lecture, '_id'>,
    unknown,
    Omit<Lecture, '_id'>
  >(payload => {
    return axios.post(`/lectures`, payload);
  });

  return (
    <Modal
      title={'Add new lecture'}
      visible={isVisible}
      destroyOnClose
      okText="Save"
      cancelText="Cancel"
      onCancel={() => setIsVisible(false)}
      onOk={async () => {
        const values = await form.validateFields();

        mutate(values, {
          onSuccess: onAdd,
        });

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
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};
