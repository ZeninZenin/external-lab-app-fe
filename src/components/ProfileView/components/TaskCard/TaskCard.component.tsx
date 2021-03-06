import React, { FC, useEffect, useState } from 'react';
import { getStatusColor, getStatusLabel } from '../../../../utils';
import {
  Badge,
  Button,
  Input,
  message,
  Rate,
  Space,
  Spin,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import { Box, Flex } from '../../../../app/components';
import { useMutation } from 'react-query';
import { axios } from 'src/axios';
import {
  ClockCircleFilled,
  CommentOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { StyledCard, StyledDeadlineText } from './TaskCard.styles';
import { TaskCardProps } from './TaskCard.types';

export const TaskCard: FC<TaskCardProps> = ({ score, refetchList }) => {
  const {
    status,
    task,
    pullRequestLink,
    student,
    score: taskScore,
    comment,
    deadlineDate,
    isOverdue,
    isUrgent,
  } = score || {};

  const [link, setLink] = useState('');

  const { isLoading, mutate } = useMutation((prLink: string) =>
    axios.put(
      pullRequestLink
        ? '/scores/update-pull-request-link'
        : '/scores/send-for-review',
      {
        studentId: student,
        taskId: task?._id,
        pullRequestLink: prLink,
      },
    ),
  );

  const { isLoading: isLoadingRevisionDone, mutate: revisionDone } =
    useMutation(() =>
      axios.put('/scores/revision-done', {
        studentId: student,
        taskId: task?._id,
      }),
    );

  useEffect(() => {
    if (pullRequestLink) {
      setLink(pullRequestLink);
    }
  }, [pullRequestLink]);

  const onUpdateLink = (link: string) => {
    if (!link) {
      message.error('Please provide a link');
      return;
    }
    setLink(link);
    mutate(link, {
      onSuccess: () => {
        message.success('Pull request link updated successfully');
        refetchList();
      },
    });
  };

  return (
    <Spin spinning={isLoading || isLoadingRevisionDone}>
      <Badge
        count={
          isOverdue ? <ClockCircleFilled style={{ color: 'red' }} /> : null
        }
      >
        <Badge.Ribbon
          text={getStatusLabel(status)}
          color={getStatusColor(status)}
        >
          <StyledCard
            isOverdue={isOverdue}
            title={
              <>
                {pullRequestLink ? (
                  <a href={pullRequestLink} target="_blank" rel="noreferrer">
                    {task?.name}
                  </a>
                ) : (
                  task?.name
                )}
              </>
            }
            extra={
              <Flex mt={12} alignItems="center">
                {taskScore && (
                  <Tooltip title={comment} placement="top">
                    <Box mr={32}>
                      <Space size="middle">
                        <Rate allowHalf value={taskScore} disabled />
                        {comment && <CommentOutlined color="green" />}
                      </Space>
                    </Box>
                  </Tooltip>
                )}
                {task.taskLink && (
                  <Tooltip title="Link to task description" placement="top">
                    <Box>
                      <a href={task.taskLink} target="_blank" rel="noreferrer">
                        <SelectOutlined />
                      </a>
                    </Box>
                  </Tooltip>
                )}
              </Flex>
            }
          >
            <p>{task?.description}</p>
            <Badge
              status={isUrgent || isOverdue ? 'error' : 'default'}
              text={
                <StyledDeadlineText isUrgent={isUrgent || isOverdue}>
                  Deadline: {moment(deadlineDate).format('DD MMMM yyyy')}
                </StyledDeadlineText>
              }
            />
            <Box height={24} />

            {pullRequestLink ? (
              <Typography.Paragraph
                editable={
                  status !== 'done' && {
                    onChange: link => onUpdateLink(link),
                  }
                }
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
            {status === 'onRevision' && (
              <Button
                type="primary"
                onClick={() =>
                  revisionDone(undefined, {
                    onSuccess: () => {
                      message.success('Status has been updated successfully');
                      refetchList();
                    },
                  })
                }
              >
                Revision done
              </Button>
            )}
          </StyledCard>
        </Badge.Ribbon>
      </Badge>
    </Spin>
  );
};
