import { TaskStatus } from '../types';
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
    case 'done':
      return 'Done';
  }
};
