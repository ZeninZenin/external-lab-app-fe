import { message, Modal, Rate } from 'antd';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { axios } from 'src/axios';
import { ScoreWithUsers } from 'src/types/score';
import { getName } from 'src/utils';

export const CompleteModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  score: ScoreWithUsers;
  refetchList(): void;
}> = ({ isVisible, setIsVisible, score, refetchList }) => {
  const { task, student } = score || {};

  const [taskScore, setTaskScore] = useState<number>();

  const { mutate } = useMutation((id: string) =>
    axios.put(`/scores/complete`, {
      id,
      score: taskScore,
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
          message.error('Please select a mentor for student first');
        }
      }}
    >
      <p>Please, rate this task</p>
      <Rate allowHalf value={taskScore} onChange={setTaskScore} />
    </Modal>
  );
};
