import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { Box } from '../../app/components';
import { Button, Typography } from 'antd';
import { Task } from 'src/types';
import React, { useState } from 'react';
import { TaskCard } from './components/TaskCard';
import { AddTaskModal } from './components/AddTaskModal';
import { ListLoader } from '../../app/components/ListLoader';

export const TaskManagement = () => {
  const { data, isLoading, refetch } = useQuery(
    'admin-tasks-list',
    async () => (await axios.get<Task[]>('/tasks')).data,
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Box>
      <Typography.Title>Task management</Typography.Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add new task
      </Button>
      <Box height={24} />
      <AddTaskModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onAdd={refetch}
      />
      {isLoading ? (
        <ListLoader />
      ) : (
        <Box>
          {data?.map(task => (
            <Box mb={24} key={task._id} maxWidth={800}>
              <TaskCard refetchList={refetch} task={task} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
