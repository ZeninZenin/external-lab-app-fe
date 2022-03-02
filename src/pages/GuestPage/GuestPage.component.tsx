import { useUserContext } from '../../context';
import React, { useEffect, useState } from 'react';
import { UpdateProfileModal } from '../../app/components';
import { Result } from 'antd';
import { useNavigate } from 'react-router';

export const GuestPage = () => {
  const { userContextValue } = useUserContext();
  const { user } = userContextValue;
  const [isEditModalVisible, setEditModalVisibleState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (!user.firstName) {
      setEditModalVisibleState(true);
    }

    if (user?.roles.includes('student')) {
      navigate('/profile');
    }

    if (user?.roles.includes('trainer')) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  return (
    <>
      <Result
        status="403"
        title="Almost done!"
        subTitle={<p>Please wait while you&apos;ll be verified by admin.</p>}
      />
      <UpdateProfileModal
        user={user}
        setIsVisible={setEditModalVisibleState}
        isVisible={isEditModalVisible}
      />
    </>
  );
};
