import { Button, Card, DatePicker, Popconfirm, Spin, Typography } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { axios } from 'src/axios';
import { useMutation } from 'react-query';
import { Flex } from 'src/app/components';
import { Lecture } from 'src/types/lecture';

export const LectureCard: FC<{ lecture: Lecture; refetchList(): void }> = ({
  lecture: lectureRes,
  refetchList,
}) => {
  const [lecture, setLecture] = useState(lectureRes);

  const { isLoading, mutate } = useMutation<
    Partial<Lecture>,
    unknown,
    Partial<Lecture>
  >(payload => {
    return axios.put(`/lectures/${payload._id}`, payload);
  });

  useEffect(() => {
    if (lectureRes) {
      setLecture(lectureRes);
    }
  }, [lectureRes]);

  const onValueChange = (partState: Partial<Lecture>) => {
    mutate({ ...partState, _id: lecture._id });
    setLecture(p => ({ ...p, ...partState }));
  };

  return (
    <Spin spinning={isLoading}>
      <Card
        title={
          <Flex>
            <Typography.Paragraph
              editable={{
                onChange: name => onValueChange({ name }),
              }}
            >
              {lecture.name}
            </Typography.Paragraph>
          </Flex>
        }
        extra={
          <Popconfirm
            title="Are you sure you want to delete this lecture?"
            onConfirm={async () => {
              await axios.delete(`/lectures/${lecture._id}`);
              refetchList();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger ghost>
              Delete
            </Button>
          </Popconfirm>
        }
      >
        <Typography.Paragraph
          editable={{
            onChange: description => onValueChange({ description }),
          }}
        >
          {lecture.description}
        </Typography.Paragraph>
        <p>
          Date:{' '}
          <DatePicker
            onChange={date =>
              onValueChange({
                date: moment(date).format(),
              })
            }
            value={moment(lecture.date)}
          />
        </p>
      </Card>
    </Spin>
  );
};
