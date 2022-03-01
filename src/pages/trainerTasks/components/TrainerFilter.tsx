import { useTrainersQuery } from 'src/utils/hooks/query/useTrainersQuery';
import React, { FC } from 'react';
import { Select } from 'antd';
import { getName } from 'src/utils';

export const TrainerFilter: FC<{
  onChange(trainers: string[]): void;
  value?: string[];
}> = ({ onChange, value }) => {
  const { data: trainers } = useTrainersQuery();

  return (
    <Select<string[]>
      mode="multiple"
      value={value}
      placeholder="Please select trainers"
      onChange={onChange}
      style={{ minWidth: 500 }}
    >
      {trainers?.map(trainer => (
        <Select.Option key={trainer._id} value={trainer._id}>
          {getName(trainer)}
        </Select.Option>
      ))}
    </Select>
  );
};
