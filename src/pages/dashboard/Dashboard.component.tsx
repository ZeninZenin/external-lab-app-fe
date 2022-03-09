import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { axios } from '../../axios';
import { ListLoader } from '../../app/components/ListLoader';
import { Box, Flex } from '../../app/components';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardTaskCard } from 'src/pages/dashboard/components/DashboardTaskCard';
import { ScoreWithUsers, TaskStatus } from 'src/types';
import { StatusFilter } from 'src/pages/dashboard/components/StatusFilter';
import { TrainerFilter } from 'src/pages/dashboard/components/TrainerFilter';
import {
  extendScoresWithDeadlineStatuses,
  sortExtendedScores,
} from '../../utils';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';
import { MyGroupFilter } from 'src/pages/dashboard/components/MyGroupFilter';

const ONE_HOUR_MS = 60 * 60 * 1000;

export const Dashboard = () => {
  const { user } = useCurrentUser();

  const [statuses, setStatuses] = useState<TaskStatus[]>([
    'onReview',
    'revisionDone',
    'onRevision',
  ]);

  const isTrainer = user?.roles.includes('trainer');

  const [trainers, setTrainers] = useState<string[]>(
    isTrainer && user?._id ? [user?._id] : [],
  );

  const [students, setStudents] = useState<string[]>();

  useEffect(() => {
    if (isTrainer && user?._id) {
      setTrainers([user._id]);
    }
  }, [isTrainer, user?._id]);

  const { data, isLoading, refetch } = useQuery(
    ['trainer-tasks', statuses, trainers, students],
    async () =>
      (
        await axios.post<ScoreWithUsers[]>(`/scores/dashboard`, {
          trainers,
          statuses,
          students: students?.length ? students : undefined,
        })
      )?.data,
    {
      enabled: !!user?._id,
      refetchInterval: ONE_HOUR_MS,
      refetchIntervalInBackground: true,
    },
  );

  const dataSorted = useMemo(() => {
    const extendedScores = extendScoresWithDeadlineStatuses(data);
    return sortExtendedScores(extendedScores);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>
          {dataSorted?.length > 0 ? `(${dataSorted?.length}) ` : ''}Externals FE
        </title>
      </Helmet>
      <Flex flexDirection="column">
        {isLoading ? (
          <ListLoader />
        ) : (
          <>
            <Box mb={24}>
              Trainer filter:{' '}
              <TrainerFilter value={trainers} onChange={setTrainers} />
            </Box>
            <Box mb={24}>
              Student filter:{' '}
              <MyGroupFilter value={students} onChange={setStudents} />
            </Box>
            <Box mb={24}>
              Status filter:{' '}
              <StatusFilter value={statuses} onChange={setStatuses} />
            </Box>
            {dataSorted?.map(score => (
              <Box key={score?._id} mb={24} width="100%" maxWidth={700}>
                <DashboardTaskCard score={score} refetchList={refetch} />
              </Box>
            ))}
          </>
        )}
      </Flex>
    </>
  );
};
