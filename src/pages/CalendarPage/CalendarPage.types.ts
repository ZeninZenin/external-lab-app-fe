import { Moment } from 'moment';
import { Score } from '../../types/score';

export interface CalendarData {
  [year: number]: {
    [month: number]: {
      [date: number]: {
        type: 'deadline' | 'lecture' | 'practice';
        value: Omit<Score, 'deadlineDate'> & { deadlineDate: Moment };
      }[];
    };
  };
}
