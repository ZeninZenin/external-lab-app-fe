import React, { FC, useMemo } from 'react';
import { Avatar, Col, Progress, Row, Statistic, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Box, Flex } from '../../app/components';
import { ListLoader } from '../../app/components/ListLoader';
import { TaskCard } from './components';
import { User } from 'src/types';
import { useStudentScoreQuery } from '../../utils';

export const ProfileView: FC<{ user?: User | null }> = ({ user }) => {
  const { data, isLoading, refetch } = useStudentScoreQuery(user as User);

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

  const speed = useMemo(() => {
    if (!data) {
      return 0;
    }

    const currentDate = new Date();

    const sortedByDeadlineData = [...data].sort(
      ({ deadlineDate: deadlineDate1 }, { deadlineDate: deadlineDate2 }) =>
        +new Date(deadlineDate1) - +new Date(deadlineDate2),
    );

    const prevTaskIndex = sortedByDeadlineData.findIndex(
      ({ deadlineDate }) => +new Date(deadlineDate) > +currentDate,
    );

    return (
      (sortedByDeadlineData.filter(({ status }) => status === 'done').length /
        (prevTaskIndex + 1)) *
      100
    );
  }, [data]);

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
                  <TaskCard score={score} refetchList={refetch} />
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
              My speed
            </Box>
            <Progress
              type="dashboard"
              percent={speed}
              // percent={((tasksDone || 0) / (data?.length || 1)) * 100}
              strokeColor={{
                '0%': 'green',
                '20%': 'yellow',
                '80%': 'yellow',
                '100%': 'red',
              }}
            />
            <Box height={24} />
            <Statistic
              title="Tasks done"
              value={tasksDone}
              suffix={`/ ${data?.length}`}
            />
            <Box height={24} />
            <Statistic
              title="Average score"
              value={averageScore}
              precision={1}
            />
          </Flex>
        </Box>
      </Col>
    </Row>
  );
};
