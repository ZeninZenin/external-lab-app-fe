import {
  Score,
  ScoreWithDeadlineStatuses,
  ScoreWithUsers,
  TaskStatus,
} from '../types';

const STATUS_PRIORITY: Record<TaskStatus, number> = {
  onRevision: 0,
  onReview: 1,
  revisionDone: 2,
  todo: 3,
  done: 4,
};

export const sortExtendedScores = <T extends Score | ScoreWithUsers>(
  scores: ScoreWithDeadlineStatuses<T>[],
) =>
  scores.sort((a, b) => {
    if (a.isOverdue || a.isUrgent) {
      return -1;
    }

    return STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
  });
