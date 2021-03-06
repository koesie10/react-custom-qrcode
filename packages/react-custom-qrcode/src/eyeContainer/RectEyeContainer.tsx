import React from 'react';
import { EyeContainerProps } from './interface';
import { getColorAttrib } from '../utils';

export const RectEyeContainer = (props: EyeContainerProps): JSX.Element => {
  const { x, y, finderPatternSize, color } = props;

  return (
    <rect
      x={x + 0.5}
      y={y + 0.5}
      width={finderPatternSize - 1}
      height={finderPatternSize - 1}
      {...getColorAttrib(color, 'stroke')}
      strokeWidth="1"
      fill="none"
    />
  );
};
