import { Box } from '../../app/components';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { LectureCard } from 'src/pages/lectureManagement/components/LectureCard';
import { AddLectureModal } from 'src/pages/lectureManagement/components/AddLectureModal';
import { ListLoader } from 'src/app/components/ListLoader';
import { UseLecturesListQuery } from '../../utils';

export const LectureManagement = () => {
  const { data, isLoading, refetch } = UseLecturesListQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Box>
      <Typography.Title>Lectures management</Typography.Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add new lecture
      </Button>
      <Box height={24} />
      <AddLectureModal
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
              <LectureCard refetchList={refetch} lecture={task} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
