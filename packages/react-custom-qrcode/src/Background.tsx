import React from 'react';
import { Color } from './colors';
import { getColorAttrib } from './utils';

export interface BackgroundProps {
  color: Color;
  size: number;
}

export const Background = (props: BackgroundProps): JSX.Element => {
  const { size, color } = props;

  // If alpha = 0, then the background is transparent so we don't need to render it
  if (!color.a) {
    return null;
  }

  return <path {...getColorAttrib(color, 'fill')} d={`M0 0h${size}v${size}H0z`} />;
};
