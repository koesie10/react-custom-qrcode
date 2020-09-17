import React from 'react';
import { EyeProps } from './interface';
import { getColorAttrib } from '../utils';

export const CircleEye = (props: EyeProps): JSX.Element => {
  const { x, y, finderPatternSize, color } = props;

  return (
    <circle cx={x + finderPatternSize / 2} cy={y + finderPatternSize / 2} r={finderPatternSize / 4} {...getColorAttrib(color, 'fill')} />
  );
};
