import { useQuery } from 'react-query';
import { axios } from '../../../axios';
import { Score } from '../../../types/score';
import { User } from '../../../types';

export const QUERY_KEY_USER_SCORE = 'user-scores';

export const useStudentScoreQuery = (user: User | undefined) =>
  useQuery(
    QUERY_KEY_USER_SCORE,
    async () => (await axios.get<Score[]>(`/users/${user?.login}/scores`)).data,
    {
      enabled: !!user?.roles?.includes('student'),
      initialData: [],
    },
  );
