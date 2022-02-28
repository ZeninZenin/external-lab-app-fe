import React, { FC, useState } from 'react';
import { Button, Card } from 'antd';
import { VerifyModal } from './VerifyModal';
import { User } from '../../../types';
import { Link } from 'react-router-dom';

export const UserItem: FC<{
  user: User & { trainer: User };
  refetchList(): void;
}> = ({ user, refetchList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Card
        title={
          <Link to={`/profile/${user.login}`}>
            {user.firstName} {user.lastName}
          </Link>
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
