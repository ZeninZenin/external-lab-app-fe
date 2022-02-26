import styled from '@emotion/styled';
import { ElementType } from 'react';
import {
  space,
  flexbox,
  typography,
  position,
  border,
  layout,
  fontSize,
  color,
  SpaceProps,
  FlexboxProps,
  TypographyProps,
  PositionProps,
  LayoutProps,
  FontSizeProps,
  BorderProps,
  ColorProps,
} from 'styled-system';

export type TBoxProps = SpaceProps &
  FlexboxProps &
  TypographyProps &
  PositionProps &
  LayoutProps &
  FontSizeProps &
  ColorProps &
  BorderProps & { as?: ElementType };

const Box = styled('div')<TBoxProps>(
  border,
  space,
  flexbox,
  position,
  typography,
  layout,
  fontSize,
  color,
);

const Flex = styled(Box)<TBoxProps>`
  display: flex;
`;

export { Box, Flex };
