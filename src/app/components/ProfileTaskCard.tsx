import React, { FC, useEffect, useState } from 'react';
import { Score } from '../../types/score';
import { getStatusColor, getStatusLabel } from '../../utils';
import { Badge, Button, Card, Input, message, Spin, Typography } from 'antd';
import moment from 'moment';
import { Box, Flex } from './index';
import { useMutation } from 'react-query';
import { axios } from 'src/axios';

export const ProfileTaskCard: FC<{ score: Score; refetchList(): void }> = ({
  score,
  refetchList,
}) => {
  const { status, task, pullRequestLink, student } = score || {};

  const [link, setLink] = useState('');

  const { isLoading, mutate } = useMutation((prLink: string) =>
    axios.put('/scores/update-pull-request-link', {
      studentId: student,
      taskId: task?._id,
      pullRequestLink: prLink,
    }),
  );

  useEffect(() => {
    if (pullRequestLink) {
      setLink(pullRequestLink);
    }
  }, [pullRequestLink]);

  const onUpdateLink = (link: string) => {
    setLink(link);
    mutate(link, {
      onSuccess: () => {
        message.success('Pull request link updated successfully');
        refetchList();
      },
    });
  };

  return (
    <Spin spinning={isLoading}>
      <Badge.Ribbon
        text={getStatusLabel(status)}
        color={getStatusColor(status)}
      >
        <Card
          title={
            pullRequestLink ? (
              <a href={pullRequestLink} target="_blank" rel="noreferrer">
                {task?.name}
              </a>
            ) : (
              task?.name
            )
          }
        >
          <p>{task?.description}</p>
          <Badge
            status="error"
            text={`Deadline: ${moment(task?.deadline).format('DD MMMM yyyy')}`}
          />
          <Box height={24} />

          {pullRequestLink ? (
            <Typography.Paragraph
              editable={{
                onChange: link => onUpdateLink(link),
              }}
            >
              {link}
            </Typography.Paragraph>
          ) : (
            <Flex>
              <Box mr={12} maxWidth={400} width="100%">
                <Input
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  placeholder={'Add pull request link here'}
                />
              </Box>
              <Button type="primary" onClick={() => onUpdateLink(link)}>
                Submit
              </Button>
            </Flex>
          )}
        </Card>
      </Badge.Ribbon>
    </Spin>
  );
};
