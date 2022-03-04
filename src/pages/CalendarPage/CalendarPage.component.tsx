import React, { FC, useCallback, useMemo } from 'react';
import { Calendar, CalendarProps, Tag, Tooltip } from 'antd';
import {
  BookOutlined,
  ExclamationCircleOutlined,
  Html5Outlined,
} from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { UseLecturesListQuery, useStudentScoreQuery } from '../../utils';
import { CalendarCellData, CalendarData } from './CalendarPage.types';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';

export const CalendarPage: FC = () => {
  const { user } = useCurrentUser();
  const { data: scoresData } = useStudentScoreQuery(user);
  const { data: lecturesData } = UseLecturesListQuery();

  const calendarData = useMemo(() => {
    const scores: CalendarCellData[] =
      scoresData?.map(({ deadlineDate, task }) => ({
        type: 'deadline',
        date: moment(deadlineDate),
        title: `Deadline: Task ${task?.name}`,
        name: task?.name,
      })) || [];

    const lectures: CalendarCellData[] =
      lecturesData?.map(({ date, name, isPractice }) => ({
        type: isPractice ? 'practice' : 'lecture',
        date: moment(date),
        title: `${isPractice ? 'Practice' : 'Lecture'}: ${name}`,
        name,
      })) || [];

    return [...scores, ...lectures]?.reduce<CalendarData>((result, current) => {
      const year = current.date.year();
      const month = current.date.month();
      const date = current.date.date();
      return {
        ...result,
        [year]: {
          ...(result[year] || {}),
          [month]: {
            ...(result[year]?.[month] || {}),
            [date]: [...(result[year]?.[month]?.[date] || []), current],
          },
        },
      };
    }, {} as CalendarData);
  }, [scoresData, lecturesData]);

  const dateCellRender: CalendarProps<Moment>['dateCellRender'] = useCallback(
    value => {
      const data =
        calendarData?.[value.year()]?.[value.month()]?.[value.date()];

      return data?.map(({ type, title, name }) => {
        return (
          <Tooltip title={title} key={title}>
            {type === 'deadline' && (
              <Tag color="error" icon={<ExclamationCircleOutlined />}>
                {name}
              </Tag>
            )}
            {type === 'lecture' && (
              <Tag color="processing" icon={<BookOutlined />}>
                {name}
              </Tag>
            )}
            {type === 'practice' && (
              <Tag color="success" icon={<Html5Outlined />}>
                {name}
              </Tag>
            )}
          </Tooltip>
        );
      });
    },
    [calendarData],
  );

  return <Calendar dateCellRender={dateCellRender} />;
};
