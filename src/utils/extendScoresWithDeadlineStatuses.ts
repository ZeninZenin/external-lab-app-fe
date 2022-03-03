import {
  ScoreWithDeadlineStatuses,
  Score,
  TaskStatus,
  ScoreWithUsers,
} from '../types';
import moment from 'moment';

const URGENT_STATUSES: TaskStatus[] = ['onRevision', 'todo'];
const OVERDUE_EXCLUDED_STATUSES: TaskStatus[] = ['done', 'revisionDone'];

export const extendScoresWithDeadlineStatuses = <
  T extends Score | ScoreWithUsers,
>(
  scores: T[] = [],
): ScoreWithDeadlineStatuses<T>[] =>
  scores.map(score => {
    const isUrgent =
      URGENT_STATUSES.includes(score.status) &&
      moment.duration(moment(score.deadlineDate).diff(new Date())).asDays() < 2;

    const isOverdue =
      !OVERDUE_EXCLUDED_STATUSES.includes(score.status) &&
      moment
        .duration(moment(score.deadlineDate).diff(new Date()))
        .asSeconds() <= 0;

    return { ...score, isUrgent, isOverdue };
  });
