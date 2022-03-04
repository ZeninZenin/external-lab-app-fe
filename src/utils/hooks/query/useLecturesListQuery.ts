import { useQuery } from 'react-query';
import { axios } from '../../../axios';
import { Lecture } from '../../../types';

export const QUERY_KEY_LECTURES_LIST = 'lectures-list';

export const UseLecturesListQuery = () =>
  useQuery(
    QUERY_KEY_LECTURES_LIST,
    async () => (await axios.get<Lecture[]>('/lectures'))?.data,
    { placeholderData: [], initialData: [] },
  );
