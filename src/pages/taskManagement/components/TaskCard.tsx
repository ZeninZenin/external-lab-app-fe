import { Button, Card, DatePicker, Popconfirm, Spin, Typography } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Task } from '../../../types';
import { axios } from '../../../axios';
import { useMutation } from 'react-query';
import { Box, Flex } from 'src/app/components';
import { SelectOutlined } from '@ant-design/icons';

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
          <Flex>
            {task.taskLink && (
              <Box mr={18}>
                <a href={task.taskLink} target="_blank" rel="noreferrer">
                  <SelectOutlined />
                </a>
              </Box>
            )}
            <Typography.Paragraph
              editable={{
                onChange: name => onValueChange({ name }),
              }}
            >
              {task.name}
            </Typography.Paragraph>
          </Flex>
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
        <Typography.Paragraph
          editable={{
            onChange: taskLink => onValueChange({ taskLink }),
          }}
        >
          {task.taskLink}
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
