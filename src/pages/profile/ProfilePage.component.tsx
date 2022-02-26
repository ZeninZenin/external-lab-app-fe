import React from 'react';
import { Avatar, Col, Progress, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Box, Flex } from '../../app/components';
import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { useUserContext } from '../../context';
import { Score } from '../../types/score';

import { ListLoader } from '../../app/components/ListLoader';
import { ProfileTaskCard } from './components/ProfileTaskCard';

export const ProfilePage = () => {
  const {
    userContextValue: { user },
  } = useUserContext();

  const { data, isLoading, refetch } = useQuery(
    'user-scores',
    async () => (await axios.get<Score[]>(`/users/${user?.login}/scores`)).data,
    {
      enabled: !!user?._id,
    },
  );

  return (
    <Row>
      <Col span={18} push={6}>
        <Flex flexDirection="column">
          <Box height={24} />
          {isLoading ? (
            <ListLoader />
          ) : (
            <>
              {data?.map(score => (
                <Box key={score?._id} mb={24} width="100%" maxWidth={700}>
                  <ProfileTaskCard score={score} refetchList={refetch} />
                </Box>
              ))}
            </>
          )}
        </Flex>
      </Col>
      <Col span={6} pull={18}>
        <Box backgroundColor="white" height="100%" p={24} mr={24}>
          <Typography.Title level={4}>My profile</Typography.Title>
          <Flex flexDirection="column" alignItems="center" mt={24}>
            <Avatar size={120} icon={<UserOutlined />} />
            <Box mt="4px">
              <b>
                {user?.firstName} {user?.lastName}
              </b>
            </Box>
            <p>{user?.roles.join(', ')}</p>
            <Box mt={48} mb={12}>
              My progress
            </Box>
            <Progress type="dashboard" percent={75} />
          </Flex>
        </Box>
      </Col>
    </Row>
  );
};
