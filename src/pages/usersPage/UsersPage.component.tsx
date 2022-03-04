import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Box } from 'src/app/components/Box';
import { axios } from 'src/axios';
import { User } from '../../types';
import { ListLoader } from '../../app/components/ListLoader';
import { UserItem } from './components/UserItem';

export const UsersPageComponent = () => {
  const { data, isLoading, refetch } = useQuery(
    'users-list',
    async () => (await axios.get<User[]>('/users'))?.data,
  );

  const sortedUsers = useMemo(
    () =>
      [...(data || [])].sort((a, b) => {
        if (a.roles.includes('guest') && !b.roles.includes('guest')) {
          return -1;
        }

        return 0;
      }),
    [data],
  );

  return isLoading ? (
    <ListLoader />
  ) : (
    <Box>
      {sortedUsers?.map(user => (
        <Box key={user._id} mb={24}>
          <UserItem user={user} refetchList={refetch} />
        </Box>
      ))}
    </Box>
  );
};
