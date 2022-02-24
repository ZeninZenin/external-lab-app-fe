import React from 'react';
import {
  Avatar,
  Badge,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Typography,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Box, Flex } from '../../app/components';

export const ProfilePage = () => {
  return (
    <Row>
      <Col span={18} push={6}>
        <Flex flexDirection="column">
          <Typography.Title level={4}>
            Welcome back, User name! Here your tasks:
          </Typography.Title>
          <Box height={24} />
          <Badge text="Overdue">
            <Badge.Ribbon text="To do" color="blue">
              <Card title="Task 1">
                <p>Description</p>
                <Badge status="error" text="Deadline: today" />
              </Card>
            </Badge.Ribbon>
          </Badge>
          <Box height={24} />
          <Badge.Ribbon text="Done" color="green">
            <Card title="Task 1">
              <p>Description</p>
            </Card>
          </Badge.Ribbon>
        </Flex>
      </Col>
      <Col span={6} pull={18}>
        <Box backgroundColor="white" height="100%" p={24} mr={24}>
          <Typography.Title level={4}>My profile</Typography.Title>
          <Flex flexDirection="column" alignItems="center" mt={24}>
            <Avatar size={120} icon={<UserOutlined />} />
            <Box mt={48} mb={12}>
              My progress
            </Box>
            <Progress type="dashboard" percent={75} />
          </Flex>
        </Box>
      </Col>
    </Row>
  );
};
