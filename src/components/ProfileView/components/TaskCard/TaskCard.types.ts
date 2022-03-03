import { Score } from '../../../../types/score';

export interface ExtendedScore extends Score {
  isUrgent: boolean;
  isOverdue: boolean;
}

export interface TaskCardProps {
  score: ExtendedScore;
  refetchList: () => void;
}
