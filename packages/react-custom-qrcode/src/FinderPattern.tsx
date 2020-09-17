import React, { createElement } from 'react';
import { Color } from './colors';
import { EyeContainerProps } from './eyeContainer/interface';
import { EyeProps } from './eye/interface';

export interface FinderPatternProps {
  x: number;
  y: number;
  size: number;
  finderPatternSize: number;
  containerColor: Color;
  eyeColor: Color;
  backgroundColor: Color;

  eyeContainerComponent: React.ComponentType<EyeContainerProps>;
  eyeComponent: React.ComponentType<EyeProps>;
}

export const FinderPattern = (props: FinderPatternProps): JSX.Element => {
  const { x, y, size, finderPatternSize, containerColor, eyeColor, backgroundColor, eyeContainerComponent, eyeComponent } = props;

  return (
    <>
      {createElement(eyeContainerComponent, {
        x,
        y,
        finderPatternSize,
        size,
        backgroundColor,
        color: containerColor,
      })}
      {createElement(eyeComponent, {
        x,
        y,
        finderPatternSize,
        size,
        color: eyeColor,
      })}
    </>
  );
};
