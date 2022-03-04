import { Moment } from 'moment';

export interface CalendarCellData {
  type: 'deadline' | 'lecture' | 'practice';
  date: Moment;
  title: string;
  name: string;
}

export interface CalendarData {
  [year: number]: {
    [month: number]: {
      [date: number]: CalendarCellData[];
    };
  };
}
