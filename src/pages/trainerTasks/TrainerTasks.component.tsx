import { useQuery } from 'react-query';
import { axios } from '../../axios';
import { ScoreWithUsers } from '../../types/score';
import { useUserContext } from '../../context';
import { ListLoader } from '../../app/components/ListLoader';
import { Box, Flex } from '../../app/components';

import React from 'react';
import { StudentTaskCard } from './components/StudentTaskCard';

export const TrainerTasks = () => {
  const {
    userContextValue: { user },
  } = useUserContext();

  const { data, isLoading, refetch } = useQuery(
    'trainer-tasks',
    async () =>
      (await axios.get<ScoreWithUsers[]>(`/scores/trainer/${user?._id}`)).data,
    {
      enabled: !!user?._id,
    },
  );

  return (
    <Flex flexDirection="column">
      {isLoading ? (
        <ListLoader />
      ) : (
        <>
          {data?.map(score => (
            <Box key={score?._id} mb={24} width="100%" maxWidth={700}>
              <StudentTaskCard score={score} refetchList={refetch} />
            </Box>
          ))}
        </>
      )}
    </Flex>
  );
};
