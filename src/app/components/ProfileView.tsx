import React, { FC, useMemo } from 'react';
import { Avatar, Col, Progress, Row, Statistic, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Box, Flex } from './Box';
import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { Score } from '../../types/score';

import { ListLoader } from './ListLoader';
import { ProfileTaskCard } from './ProfileTaskCard';
import { User } from 'src/types';

export const ProfileView: FC<{ user?: User | null }> = ({ user }) => {
  const { data, isLoading, refetch } = useQuery(
    'user-scores',
    async () => (await axios.get<Score[]>(`/users/${user?.login}/scores`)).data,
    {
      enabled: !!user?._id,
    },
  );

  const dataSorted = useMemo(
    () =>
      data?.sort(a => {
        if (a.status === 'done') {
          return 1;
        }

        if (a.status === 'onReview' || a.status === 'onRevision') {
          return -1;
        }

        return 0;
      }),
    [data],
  );

  const tasksDone = useMemo(
    () => data?.filter(x => x.status === 'done').length,
    [data],
  );

  const averageScore = useMemo(
    () =>
      (data?.reduce((acc, item) => acc + (item.score || 0), 0) || 0) /
      (tasksDone || 1),
    [data, tasksDone],
  );

  return (
    <Row>
      <Col span={18} push={6}>
        <Flex flexDirection="column">
          {isLoading ? (
            <ListLoader />
          ) : (
            <>
              {dataSorted?.map(score => (
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
            <Progress
              type="dashboard"
              percent={((tasksDone || 0) / (data?.length || 1)) * 100}
            />
            <Box height={24} />
            <Statistic
              title="Tasks done"
              value={tasksDone}
              suffix={`/ ${data?.length}`}
            />
            <Box height={24} />
            <Statistic title="Average score" value={averageScore} />
          </Flex>
        </Box>
      </Col>
    </Row>
  );
};
