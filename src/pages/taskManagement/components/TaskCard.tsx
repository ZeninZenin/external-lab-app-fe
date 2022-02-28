import { Button, Card, DatePicker, Popconfirm, Spin, Typography } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Task } from '../../../types';
import { axios } from '../../../axios';
import { useMutation } from 'react-query';

export const TaskCard: FC<{ task: Task; refetchList(): void }> = ({
  task: taskRes,
  refetchList,
}) => {
  const [task, setTask] = useState(taskRes);

  const { isLoading, mutate } = useMutation<
    Partial<Task>,
    unknown,
    Partial<Task>
  >(taskPayload => {
    return axios.put(`/tasks/${taskPayload._id}`, taskPayload);
  });

  useEffect(() => {
    if (taskRes) {
      setTask(taskRes);
    }
  }, [taskRes]);

  const onValueChange = (partOfTask: Partial<Task>) => {
    mutate({ ...partOfTask, _id: task._id });
    setTask(p => ({ ...p, ...partOfTask }));
  };

  return (
    <Spin spinning={isLoading}>
      <Card
        title={
          <Typography.Paragraph
            editable={{
              onChange: name => onValueChange({ name }),
            }}
          >
            {task.name}
          </Typography.Paragraph>
        }
        extra={
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={async () => {
              await axios.delete(`/tasks/${task._id}`);
              refetchList();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger ghost>
              Delete
            </Button>
          </Popconfirm>
        }
      >
        <Typography.Paragraph
          editable={{
            onChange: description => onValueChange({ description }),
          }}
        >
          {task.description}
        </Typography.Paragraph>
        <p>
          Deadline:{' '}
          <DatePicker
            onChange={deadline =>
              onValueChange({
                deadline: moment(deadline).format(),
              })
            }
            value={moment(task.deadline)}
          />
        </p>
      </Card>
    </Spin>
  );
};
