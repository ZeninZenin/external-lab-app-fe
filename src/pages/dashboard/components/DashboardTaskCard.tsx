import React, { FC, useEffect, useState } from 'react';
import { ScoreWithUsers } from 'src/types/score';
import { getName, getStatusColor, getStatusLabel } from 'src/utils';
import {
  Avatar,
  Badge,
  Button,
  Card,
  message,
  Popconfirm,
  Rate,
  Space,
  Spin,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import { Box, Flex } from 'src/app/components';
import { useMutation } from 'react-query';
import { axios } from 'src/axios';
import { CompleteTaskModal } from 'src/pages/dashboard/components/CompleteTaskModal';
import { Link } from 'react-router-dom';
import { CommentOutlined, SelectOutlined } from '@ant-design/icons';
import { UpdateDeadlineModal } from 'src/pages/dashboard/components/UpdateDeadlineModal';

export const DashboardTaskCard: FC<{
  score: ScoreWithUsers;
  refetchList(): void;
}> = ({ score, refetchList }) => {
  const {
    status,
    task,
    pullRequestLink,
    student,
    score: taskScore,
    comment,
  } = score || {};

  const [link, setLink] = useState('');

  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false);
  const [isUpdateDeadlineModalVisible, setIsUpdateDeadlineModalVisible] =
    useState(false);

  const { isLoading, mutate } = useMutation((prLink: string) =>
    axios.put('/scores/update-pull-request-link', {
      studentId: student,
      taskId: task?._id,
      pullRequestLink: prLink,
    }),
  );

  const { isLoading: isSendToRevisionLoading, mutate: sendToRevision } =
    useMutation(() =>
      axios.put('/scores/send-for-revision', {
        studentId: student?._id,
        taskId: task?._id,
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
    score && (
      <>
        <Spin spinning={isLoading || isSendToRevisionLoading}>
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
              extra={
                <Flex alignItems="center" mt={16}>
                  {taskScore && (
                    <Tooltip title={comment} placement="top">
                      <Box mr={24}>
                        <Space size="middle">
                          <Rate allowHalf value={taskScore} disabled />
                          {comment && <CommentOutlined color="green" />}
                        </Space>
                      </Box>
                    </Tooltip>
                  )}
                  <Flex alignItems="center" mr={24}>
                    <Space>
                      <Avatar>{getName(student)?.slice(0, 1)}</Avatar>
                      <Link to={`/profile/${student?.login}`}>
                        {getName(student)}
                      </Link>
                    </Space>
                  </Flex>
                  {task.taskLink && (
                    <Tooltip title="Link to task description" placement="top">
                      <Box mr={12}>
                        <a
                          href={task.taskLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SelectOutlined />
                        </a>
                      </Box>
                    </Tooltip>
                  )}
                </Flex>
              }
            >
              <p>{task?.description}</p>
              {score?.submissionDate && (
                <p>
                  <Badge
                    status="success"
                    text={`Submitted on: ${moment(score?.submissionDate).format(
                      'DD MMMM yyyy HH:mm',
                    )}`}
                  />
                </p>
              )}
              <p>
                <Badge
                  status="error"
                  text={`Deadline: ${moment(task?.deadline).format(
                    'DD MMMM yyyy',
                  )}`}
                />
              </p>
              {score?.deadlineDate !== task?.deadline && (
                <p>
                  <Tooltip
                    title={score.deadlineChangeComment}
                    placement="right"
                  >
                    <Badge
                      status="error"
                      text={`Deadline changed to: ${moment(
                        score?.deadlineDate,
                      ).format('DD MMMM yyyy')}`}
                    />
                  </Tooltip>
                </p>
              )}

              {score?.sendingForRevisionDate && (
                <p>
                  <Badge
                    status="processing"
                    text={`Sent on revision: ${moment(
                      score?.sendingForRevisionDate,
                    ).format('DD MMMM yyyy HH:mm')}`}
                  />
                </p>
              )}
              {score?.revisionDoneDate && (
                <p>
                  <Badge
                    status="success"
                    text={`Revision done on: ${moment(
                      score?.revisionDoneDate,
                    ).format('DD MMMM yyyy HH:mm')}`}
                  />
                </p>
              )}
              {score?.completionDate && (
                <p>
                  <Badge
                    status="success"
                    text={`Completed on: ${moment(score?.completionDate).format(
                      'DD MMMM yyyy HH:mm',
                    )}`}
                  />
                </p>
              )}
              <Box height={24} />

              {pullRequestLink && (
                <Typography.Paragraph
                  editable={{
                    onChange: link => onUpdateLink(link),
                  }}
                >
                  {link}
                </Typography.Paragraph>
              )}
              <Space>
                {(status === 'revisionDone' || status === 'onReview') && (
                  <Button
                    type="primary"
                    onClick={() => setIsCompleteModalVisible(true)}
                  >
                    Complete
                  </Button>
                )}
                {status === 'onReview' && (
                  <>
                    <Popconfirm
                      title="Are sure you want to send to revision?"
                      onConfirm={() => {
                        sendToRevision(undefined, {
                          onSuccess: () => {
                            message.success('Task has been send to revision');
                            refetchList();
                          },
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" danger>
                        Send to revision
                      </Button>
                    </Popconfirm>
                  </>
                )}
                {status !== 'done' && (
                  <Button
                    type="default"
                    onClick={() => setIsUpdateDeadlineModalVisible(true)}
                  >
                    Update deadline
                  </Button>
                )}
              </Space>
            </Card>
          </Badge.Ribbon>
        </Spin>
        <CompleteTaskModal
          score={score}
          refetchList={refetchList}
          isVisible={isCompleteModalVisible}
          setIsVisible={setIsCompleteModalVisible}
        />
        <UpdateDeadlineModal
          score={score}
          refetchList={refetchList}
          isVisible={isUpdateDeadlineModalVisible}
          setIsVisible={setIsUpdateDeadlineModalVisible}
        />
      </>
    )
  );
};
