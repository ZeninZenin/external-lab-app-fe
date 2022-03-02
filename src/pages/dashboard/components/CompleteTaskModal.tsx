import { message, Modal, Rate, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { Box } from 'src/app/components';
import { axios } from 'src/axios';
import { ScoreWithUsers } from 'src/types/score';
import { getName } from 'src/utils';

export const CompleteTaskModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  score: ScoreWithUsers;
  refetchList(): void;
}> = ({ isVisible, setIsVisible, score, refetchList }) => {
  const { task, student } = score || {};

  const [taskScore, setTaskScore] = useState<number>();
  const [comment, setComment] = useState<string>('');

  const { mutate } = useMutation((id: string) =>
    axios.put(`/scores/complete`, {
      id,
      score: taskScore,
      comment,
    }),
  );

  return (
    <Modal
      title={`Complete task ${task.name} for ${getName(student)}`}
      visible={isVisible}
      destroyOnClose
      okText="Complete task"
      cancelText="Cancel"
      onCancel={() => setIsVisible(false)}
      onOk={async () => {
        if (taskScore) {
          mutate(score._id, {
            onSuccess: () => {
              refetchList();
              message.success('Task has been completed successfully');
            },
          });

          setIsVisible(false);
        } else {
          message.error('Please select score for task');
        }
      }}
    >
      <p>Please, rate this task</p>
      <Rate allowHalf value={taskScore} onChange={setTaskScore} />
      <Box height={24} />
      <Input.TextArea
        rows={4}
        placeholder={'Comment (if needed)'}
        onChange={e => setComment(e.target.value)}
        value={comment}
      />
    </Modal>
  );
};
