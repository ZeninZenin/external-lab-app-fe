import React from 'react';
import { FC } from 'react';
import { Skeleton } from 'antd';
import { Box } from './Box';

export const ListLoader: FC<{ itemsToShow?: number }> = ({
  itemsToShow = 4,
}) => {
  return (
    <Box>
      {[...new Array(itemsToShow)].map((_, i) => (
        <Box mb={24} key={i}>
          <Skeleton active />
        </Box>
      ))}
    </Box>
  );
};
