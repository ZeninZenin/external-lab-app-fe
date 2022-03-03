import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { User } from 'src/types';
import { getJWTPayload } from 'src/utils/jwt';
import { useMemo } from 'react';

export const QUERY_KEY_USER = 'user-info';

export const useCurrentUser = (options?: { login?: string }) => {
  const userInToken = useMemo(
    () => getJWTPayload(localStorage.getItem('token'))?.user,
    [],
  );

  const { data: user, ...rest } = useQuery(
    QUERY_KEY_USER,
    async () =>
      (await axios.get<User>(`/users/${options?.login || userInToken?.login}`))
        ?.data,
    {
      enabled: !!userInToken || !!options?.login,
      staleTime: Infinity,
      refetchOnWindowFocus: 'always',
      placeholderData: userInToken,
    },
  );

  return { user, ...rest };
};
