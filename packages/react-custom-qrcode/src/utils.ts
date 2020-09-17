import { Color } from './colors';
import React from 'react';

export const getColorAttrib = <T extends SVGElement>(color: Color, attrib: string): React.SVGProps<T> => {
  const alpha = color.a / 255;

  const props: React.SVGProps<T> = {
    [attrib]: color.hex,
  };

  if (alpha < 1) {
    props[`${attrib.toString()}Opacity`] = alpha.toFixed(2).slice(1);
  }

  return props;
};

interface MaskModulesOptions {
  finderPatternSize: number;
  size: number;
  maskImage: boolean;
  renderedImageSize: number;
}

export const maskModules = (modules: Uint8Array, options: MaskModulesOptions): Uint8Array => {
  const { finderPatternSize, size, maskImage, renderedImageSize } = options;

  const center = size / 2;

  return modules.map((active, i): number => {
    if (!active) {
      return 0;
    }

    const col = Math.floor(i % size);
    const row = Math.floor(i / size);

    if (col < finderPatternSize && row < finderPatternSize) {
      // Top-left finder pattern
      return 0;
    } else if (col < finderPatternSize && size - row - 1 < finderPatternSize) {
      // Bottom-right finder pattern
      return 0;
    } else if (size - col - 1 < finderPatternSize && row < finderPatternSize) {
      // Top-right finder pattern
      return 0;
    }

    if (
      maskImage &&
      col > center - renderedImageSize / 2 - 1 &&
      col < center + renderedImageSize / 2 &&
      row > center - renderedImageSize / 2 - 1 &&
      row < center + renderedImageSize / 2
    ) {
      return 0;
    }

    return 1;
  });
};
