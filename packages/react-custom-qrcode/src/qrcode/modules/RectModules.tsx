import React from 'react';
import { ModulesProps } from './interface';
import { getColorAttrib } from '../utils';

export const RectModules = (props: ModulesProps): JSX.Element => {
  const { modules, size, color } = props;

  return (
    <g {...getColorAttrib(color, 'fill')}>
      {Array.from(modules).map(
        (active, i): JSX.Element => {
          if (!active) {
            return null;
          }

          const col = Math.floor(i % size);
          const row = Math.floor(i / size);

          return <rect key={i} x={col} y={row} width={1} height={1} />;
        }
      )}
    </g>
  );
};
