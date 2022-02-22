import styled from '@emotion/styled';
import Text from 'antd/es/typography/Text';

export const ProfileText = styled(Text)`
  color: #ddd;
  font-size: 24px;
  padding-left: 12px;
`;

export const ProfileRoot = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    filter: brightness(115%);
  }
`;
