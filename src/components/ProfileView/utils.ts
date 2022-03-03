import { Score } from '../../types/score';
import moment from 'moment';
import { TaskStatus } from '../../types';
import { ExtendedScore } from './components/TaskCard/TaskCard.types';

const URGENT_STATUSES: TaskStatus[] = ['onRevision', 'todo'];

const STATUS_PRIORITY: Record<TaskStatus, number> = {
  onRevision: 0,
  onReview: 1,
  revisionDone: 2,
  todo: 3,
  done: 4,
};

export const extendScores = (scores: Score[] = []): ExtendedScore[] =>
  scores.map(score => {
    const isUrgent =
      URGENT_STATUSES.includes(score.status) &&
      moment.duration(moment(score.deadlineDate).diff(new Date())).asDays() < 2;

    const isOverdue =
      score.status !== 'done' &&
      moment
        .duration(moment(score.deadlineDate).diff(new Date()))
        .asSeconds() <= 0;

    return { ...score, isUrgent, isOverdue };
  });

export const sortScores = (scores: ExtendedScore[]) =>
  scores.sort((a, b) => {
    if (a.isOverdue || a.isUrgent) {
      return -1;
    }

    return STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
  });
