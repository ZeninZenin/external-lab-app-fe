import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyledDeadlineText = styled.span<{ isUrgent: boolean }>`
  color: ${({ isUrgent }) => (isUrgent ? 'red' : '')};
  font-weight: ${({ isUrgent }) => (isUrgent ? 600 : '')};
`;

export const StyledCard = styled(Card)<{ isOverdue: boolean }>`
  border: 2px solid ${({ isOverdue }) => (isOverdue ? 'red' : 'transparent')};
  width: 600px;
`;
