import React from 'react';
import { ModulesProps } from './interface';
import { getColorAttrib } from '../utils';

export const CircleModules = (props: ModulesProps): JSX.Element => {
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

          return <circle key={i} cx={col + 0.5} cy={row + 0.5} r={0.5} />;
        }
      )}
    </g>
  );
};
