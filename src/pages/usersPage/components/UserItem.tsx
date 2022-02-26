import React, { FC, useState } from 'react';
import { Box } from '../../../app/components';
import { Button, Card } from 'antd';
import { VerifyModal } from './VerifyModal';
import { User } from '../../../types';

export const UserItem: FC<{ user: User; refetchList(): void }> = ({
  user,
  refetchList,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Card
        title={
          <Box>
            {user.firstName} {user.lastName}
          </Box>
        }
        extra={
          user.roles.includes('guest') && (
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Verify
            </Button>
          )
        }
      >
        <p>Github: {user.githubName}</p>
        <p>Roles: {user.roles.join(', ')}</p>
        {user.trainer && (
          <p>
            Trainer: {user.trainer.firstName} {user.trainer.lastName}
          </p>
        )}
      </Card>
      <VerifyModal
        user={user}
        setIsVisible={setIsModalVisible}
        isVisible={isModalVisible}
        refetchList={refetchList}
      />
    </>
  );
};
