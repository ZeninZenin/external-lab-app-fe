import { ScoreWithDeadlineStatuses } from '../../../../types';

export interface TaskCardProps {
  score: ScoreWithDeadlineStatuses;
  refetchList: () => void;
}
