import React from 'react';
import { ModulesProps } from './interface';
import { getColorAttrib } from '../utils';

const svgCmd = (cmd: string, x: number, y?: number): string => {
  let str = `${cmd}${x}`;
  if (typeof y !== 'undefined') str += ` ${y}`;

  return str;
};

// https://github.com/soldair/node-qrcode/blob/f829dd296a5aadca7cf8657a0f1e4e86f236a6a7/lib/renderer/svg-tag.js
const qrToPath = (data: Uint8Array, size: number): string => {
  let path = '';
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);

    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd('M', col, 0.5 + row) : svgCmd('m', moveBy, 0);

        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path;
};

export const HorizontalSegmentRectModules = (props: ModulesProps): JSX.Element => {
  const { modules, size, color } = props;

  return (
    <g {...getColorAttrib(color, 'stroke')}>
      <path d={qrToPath(modules, size)} />
    </g>
  );
};
