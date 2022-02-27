import { useQuery } from 'react-query';
import { axios } from '../../axios';
import { ScoreWithUsers } from '../../types/score';
import { useUserContext } from '../../context';
import { ListLoader } from '../../app/components/ListLoader';
import { Box, Flex } from '../../app/components';

import React, { useMemo, useState } from 'react';
import { StudentTaskCard } from './components/StudentTaskCard';
import { TaskStatus } from 'src/types';
import { StatusFilter } from 'src/pages/trainerTasks/components/StatusFilter';

export const TrainerTasks = () => {
  const {
    userContextValue: { user },
  } = useUserContext();

  const [statuses, setStatuses] = useState<TaskStatus[]>([
    'onReview',
    'revisionDone',
    'onRevision',
  ]);

  const { data, isLoading, refetch } = useQuery(
    ['trainer-tasks', statuses],
    async () =>
      (
        await axios.get<ScoreWithUsers[]>(
          `/scores/trainer/${user?._id}?statuses=${
            statuses ? statuses.join(',') : null
          }`,
        )
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
            Status filter:{' '}
            <StatusFilter value={statuses} onChange={setStatuses} />
          </Box>
          {dataSorted?.map(score => (
            <Box key={score?._id} mb={24} width="100%" maxWidth={700}>
              <StudentTaskCard score={score} refetchList={refetch} />
            </Box>
          ))}
        </>
      )}
    </Flex>
  );
};
