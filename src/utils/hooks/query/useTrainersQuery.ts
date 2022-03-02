import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { User } from 'src/types';

const QUERY_KEY_TRAINERS = 'trainers';

export const useTrainersQuery = () =>
  useQuery(
    QUERY_KEY_TRAINERS,
    async () => (await axios.get<User[]>('/users/trainers')).data,
  );
