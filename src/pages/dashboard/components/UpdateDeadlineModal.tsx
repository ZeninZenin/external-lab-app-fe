import { message, Modal, Input, DatePicker, Form } from 'antd';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { axios } from 'src/axios';
import { ScoreWithUsers } from 'src/types/score';
import { getName } from 'src/utils';
import moment from 'moment';

export const UpdateDeadlineModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  score: ScoreWithUsers;
  refetchList(): void;
}> = ({ isVisible, setIsVisible, score, refetchList }) => {
  const { task, student } = score || {};

  const [form] =
    Form.useForm<
      Pick<ScoreWithUsers, 'deadlineDate' | 'deadlineChangeComment'>
    >();

  const { mutate } = useMutation(
    ({
      id,
      deadlineDate,
      deadlineChangeComment,
    }: {
      id: string;
      deadlineDate: string;
      deadlineChangeComment: string;
    }) =>
      axios.put(`/scores/updateDeadline`, {
        id,
        deadlineDate,
        deadlineChangeComment,
      }),
  );

  return (
    <Modal
      title={`Update deadline for ${task.name} for ${getName(student)}`}
      visible={isVisible}
      destroyOnClose
      okText="Update deadline"
      cancelText="Cancel"
      onCancel={() => setIsVisible(false)}
      onOk={async () => {
        const values = await form.validateFields();

        mutate(
          { ...values, id: score._id },
          {
            onSuccess: () => {
              message.success('Deadline has been updated successfully');
              refetchList();
              setIsVisible(false);
            },
          },
        );

        setIsVisible(false);
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Form.Item
          name="deadlineDate"
          label="New deadline"
          rules={[{ required: true }]}
        >
          <DatePicker defaultValue={moment(score.deadlineDate)} />
        </Form.Item>
        <Form.Item
          name="deadlineChangeComment"
          label="Comment"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
