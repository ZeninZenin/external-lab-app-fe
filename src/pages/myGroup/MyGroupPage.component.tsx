import React from 'react';
import { Box } from 'src/app/components/Box';
import { ListLoader } from '../../app/components/ListLoader';
import { Link } from 'react-router-dom';
import { Avatar, Card, Space, Typography } from 'antd';
import { getName } from 'src/utils';
import { useMyGroupQuery } from 'src/utils/hooks/query/useMyGroupQuery';

export const MyGroupPageComponent = () => {
  const { data, isLoading } = useMyGroupQuery();

  return isLoading ? (
    <ListLoader />
  ) : (
    <Box>
      <Typography.Title>My group</Typography.Title>
      {data?.map(user => (
        <Box key={user._id} mb={24}>
          <Card
            title={
              <Space>
                <Avatar>{getName(user)?.slice(0, 1)}</Avatar>
                <Link to={`/profile/${user.login}`}>{getName(user)}</Link>
              </Space>
            }
          >
            <p>
              Github:{' '}
              <a
                href={`https://github.com/${user.login}/external-courses/pulls`}
              >
                {user.login}
              </a>
            </p>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
