import { message, Modal, Select } from 'antd';
import React, { FC, useState } from 'react';
import { User } from 'src/types';
import { useMutation } from 'react-query';
import { axios } from 'src/axios';
import { useTrainersQuery } from 'src/utils/hooks/query/useTrainersQuery';

export const VerifyModal: FC<{
  isVisible: boolean;
  setIsVisible(v: boolean): void;
  user: User;
  refetchList(): void;
}> = ({ isVisible, setIsVisible, user, refetchList }) => {
  const [trainer, setTrainer] = useState<string>();

  const { data: trainers } = useTrainersQuery();

  const { mutate } = useMutation(() =>
    axios.put('/users/verify', {
      login: user.login,
      roles: 'student',
      trainer: trainer,
    }),
  );
  return (
    <Modal
      title={`Verify user ${user.login} ${user.firstName} ${user.lastName}`}
      visible={isVisible}
      destroyOnClose
      okText="Save"
      cancelText="Cancel"
      onCancel={() => setIsVisible(false)}
      onOk={async () => {
        if (trainer) {
          mutate(undefined, {
            onSuccess: refetchList,
          });

          setIsVisible(false);
        } else {
          message.error('Please select a mentor for student first');
        }
      }}
    >
      <Select
        onChange={setTrainer}
        value={trainer}
        placeholder={'Please select a trainer'}
      >
        {trainers?.map(v => (
          <Select.Option value={v._id} key={v._id}>
            {v.firstName} {v.lastName}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};
