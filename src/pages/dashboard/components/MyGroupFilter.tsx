import React, { FC } from 'react';
import { Select } from 'antd';
import { getName } from 'src/utils';
import { useMyGroupQuery } from 'src/utils/hooks/query/useMyGroupQuery';

export const MyGroupFilter: FC<{
  onChange(users: string[]): void;
  value?: string[];
}> = ({ onChange, value }) => {
  const { data } = useMyGroupQuery();

  return (
    <Select<string[]>
      mode="multiple"
      value={value}
      placeholder="Please select user"
      onChange={onChange}
      style={{ minWidth: 500 }}
    >
      {data?.map(user => (
        <Select.Option key={user._id} value={user._id}>
          {getName(user)}
        </Select.Option>
      ))}
    </Select>
  );
};
