import { useUserContext } from '../../context';
import React, { useState } from 'react';
import { UpdateProfileModal } from '../../app/components';
import { Button, Result } from 'antd';

export const GuestPage = () => {
  const { userContextValue } = useUserContext();
  const { user } = userContextValue;
  const [isEditModalVisible, setEditModalVisibleState] = useState(false);

  return (
    <>
      <Result
        status="403"
        title="Almost done!"
        subTitle={
          <p>
            Please wait while you&apos;ll be verified by admin. <br />
            As for now, you can add your name:
          </p>
        }
        extra={
          <Button type="primary" onClick={() => setEditModalVisibleState(true)}>
            Add your name
          </Button>
        }
      />
      <UpdateProfileModal
        user={user}
        setIsVisible={setEditModalVisibleState}
        isVisible={isEditModalVisible}
      />
    </>
  );
};
