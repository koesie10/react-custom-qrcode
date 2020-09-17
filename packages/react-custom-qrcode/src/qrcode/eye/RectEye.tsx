import React from 'react';
import { EyeProps } from './interface';
import { getColorAttrib } from '../utils';

export const RectEye = (props: EyeProps): JSX.Element => {
  const { x, y, finderPatternSize, color } = props;

  return <rect x={x + 2} y={y + 2} width={finderPatternSize - 4} height={finderPatternSize - 4} {...getColorAttrib(color, 'fill')} />;
};
