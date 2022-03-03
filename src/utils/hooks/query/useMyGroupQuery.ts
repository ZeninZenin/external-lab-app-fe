import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { User } from 'src/types';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';

const QUERY_KEY_MY_GROUP = 'my-group';

export const useMyGroupQuery = () => {
  const { user } = useCurrentUser();
  return useQuery(
    QUERY_KEY_MY_GROUP,
    async () => (await axios.get<User[]>(`/users/${user?._id}/mentees`))?.data,
    {
      enabled: !!user?._id,
    },
  );
};
