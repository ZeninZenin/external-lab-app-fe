import { useQuery } from 'react-query';
import { axios } from '../../axios';
import { ScoreWithUsers } from '../../types/score';
import { useUserContext } from '../../context';
import { ListLoader } from '../../app/components/ListLoader';
import { Box, Flex } from '../../app/components';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardTaskCard } from 'src/pages/dashboard/components/DashboardTaskCard';
import { TaskStatus } from 'src/types';
import { StatusFilter } from 'src/pages/dashboard/components/StatusFilter';
import { TrainerFilter } from 'src/pages/dashboard/components/TrainerFilter';

export const TrainerTasks = () => {
  const {
    userContextValue: { user },
  } = useUserContext();

  const [statuses, setStatuses] = useState<TaskStatus[]>([
    'onReview',
    'revisionDone',
    'onRevision',
  ]);

  const isTrainer = user?.roles.includes('trainer');

  const [trainers, setTrainers] = useState<string[]>(
    isTrainer && user?._id ? [user?._id] : [],
  );

  useEffect(() => {
    if (isTrainer && user?._id) {
      setTrainers([user._id]);
    }
  }, [isTrainer, user?._id]);

  const { data, isLoading, refetch } = useQuery(
    ['trainer-tasks', statuses, trainers],
    async () =>
      (
        await axios.post<ScoreWithUsers[]>(`/scores/dashboard`, {
          trainers,
          statuses,
        })
      ).data,
    {
      enabled: !!user?._id,
    },
  );

  const dataSorted = useMemo(
    () =>
      data?.sort(a => {
        if (a.status === 'done' || a.status === 'todo') {
          return 1;
        }

        if (
          a.status === 'onReview' ||
          a.status === 'onRevision' ||
          a.status === 'revisionDone'
        ) {
          return -1;
        }

        return 0;
      }),
    [data],
  );

  return (
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
  );
};
