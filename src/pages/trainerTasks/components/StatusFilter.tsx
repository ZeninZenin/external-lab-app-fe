import React, { FC } from 'react';
import { TaskStatus } from 'src/types';
import { Select } from 'antd';

const TASK_STATUSES: Record<TaskStatus, string> = {
  onReview: 'On review',
  onRevision: 'On revision',
  revisionDone: 'Revision done',
  done: 'Done',
  todo: 'Todo',
};

export const StatusFilter: FC<{
  onChange(statuses: TaskStatus[]): void;
  value: TaskStatus[];
}> = ({ onChange, value }) => {
  return (
    <Select<TaskStatus[]>
      mode="multiple"
      value={value}
      placeholder="Please select statuses"
      onChange={onChange}
      style={{ minWidth: 500 }}
    >
      {Object.entries(TASK_STATUSES).map(([status, title]) => (
        <Select.Option key={status} value={status}>
          {title}
        </Select.Option>
      ))}
    </Select>
  );
};
