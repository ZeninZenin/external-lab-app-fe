import React, { FC } from 'react';
import { UserRole } from '../../types';
import { Button, Result, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { Flex } from './Box';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';

export const PrivateRoute: FC<{
  roles: UserRole[];
}> = ({ children, roles }) => {
  const { user } = useCurrentUser();

  if (!user) {
    return (
      <Flex height="100%" alignItems="center" justifyContent="center">
        <Spin size="large" />
      </Flex>
    );
  }

  const isUserHasAccess = roles.some(role => user?.roles?.includes(role));
  const isAdmin = user?.roles?.includes('admin');

  if (!isUserHasAccess && !isAdmin) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to={'/'}>Back Home</Link>
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
};
