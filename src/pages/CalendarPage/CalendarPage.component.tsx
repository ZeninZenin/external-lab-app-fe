import React, { FC, useCallback, useMemo } from 'react';
import { Calendar, CalendarProps, Tag, Tooltip } from 'antd';
import {
  BookOutlined,
  ExclamationCircleOutlined,
  Html5Outlined,
} from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { UseStudentScoreQuery } from '../../utils';
import { useUserContext } from '../../context';
import { User } from '../../types';
import { CalendarData } from './CalendarPage.types';

export const CalendarPage: FC = () => {
  const { userContextValue } = useUserContext();
  const { data: scoresData } = UseStudentScoreQuery(
    userContextValue?.user as User,
  );

  const calendarData = useMemo(() => {
    const scores: CalendarData[number][number][number] =
      scoresData?.map(({ deadlineDate, ...rest }) => ({
        type: 'deadline',
        value: { deadlineDate: moment(deadlineDate), ...rest },
      })) || [];

    // place converted data of lectures and practice to add it to calendar data
    const lecturesData: CalendarData[number][number][number] = scores.map(
      ({ value }) => ({
        type: 'lecture',
        value: { ...value, name: 'test_lecture' },
      }),
    );

    const practiceData: CalendarData[number][number][number] = scores.map(
      ({ value }) => ({
        type: 'practice',
        value: { ...value, name: 'test_practice' },
      }),
    );

    return [...scores, ...practiceData, ...lecturesData]?.reduce<CalendarData>(
      (result, { type, value }) => {
        const year = value.deadlineDate.year();
        const month = value.deadlineDate.month();
        const date = value.deadlineDate.date();
        return {
          ...result,
          [year]: {
            ...(result[year] || {}),
            [month]: {
              ...(result[year]?.[month] || {}),
              [date]: [
                ...(result[year]?.[month]?.[date] || []),
                { type, value },
              ],
            },
          },
        };
      },
      {} as CalendarData,
    );
  }, [scoresData]);

  const dateCellRender: CalendarProps<Moment>['dateCellRender'] = useCallback(
    value => {
      const data =
        calendarData?.[value.year()]?.[value.month()]?.[value.date()];

      return data?.map(data => {
        switch (data?.type) {
          case 'deadline':
            return (
              <Tooltip title={`Deadline: Task ${data?.value?.task?.name}`}>
                <Tag color="error" icon={<ExclamationCircleOutlined />}>
                  {data?.value?.task?.name}
                </Tag>
              </Tooltip>
            );

          case 'lecture':
            return (
              <Tooltip title={`Lecture: ${(data?.value as any)?.name}`}>
                <Tag color="processing" icon={<BookOutlined />}>
                  {(data?.value as any)?.name}
                </Tag>
              </Tooltip>
            );

          case 'practice':
            return (
              <Tooltip title={`Practice: ${(data?.value as any)?.name}`}>
                <Tag color="success" icon={<Html5Outlined />}>
                  {(data?.value as any)?.name}
                </Tag>
              </Tooltip>
            );

          default:
            return null;
        }
      });
    },
    [calendarData],
  );

  return <Calendar dateCellRender={dateCellRender} />;
};
