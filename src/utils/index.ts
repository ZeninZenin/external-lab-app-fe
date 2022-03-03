import { TaskStatus, User } from '../types';
import { PresetColorType } from 'antd/lib/_util/colors';

export { getJWTPayload } from './jwt';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const getStatusColor = (status: TaskStatus): PresetColorType => {
  switch (status) {
    case 'todo':
      return 'blue';
    case 'onReview':
      return 'yellow';
    case 'onRevision':
      return 'red';
    case 'revisionDone':
      return 'yellow';
    case 'done':
      return 'green';
  }
};

export const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case 'todo':
      return 'To Do';
    case 'onReview':
      return 'On Review';
    case 'onRevision':
      return 'On Revision';
    case 'revisionDone':
      return 'Revision Done';
    case 'done':
      return 'Done';
  }
};

export const getName = (user: User) => {
  const userName =
    user?.lastName && user?.firstName
      ? `${user.firstName} ${user.lastName}`
      : user?.githubName;

  return userName || user?.login;
};

export { sortExtendedScores } from './sortExtendedScores';
export { extendScoresWithDeadlineStatuses } from './extendScoresWithDeadlineStatuses';

export * from './hooks';
