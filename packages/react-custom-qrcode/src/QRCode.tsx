import React, { createElement, useMemo } from 'react';
import { convertColors, renderColors, RenderColors } from './colors';

import QRCodeGenerator, { QRCodeErrorCorrectionLevel } from 'qrcode';
import { Background, BackgroundProps } from './Background';
import { maskModules } from './utils';
import { ModulesProps } from './modules/interface';
import { EyeContainerProps } from './eyeContainer/interface';
import { EyeProps } from './eye/interface';
import { FinderPattern } from './FinderPattern';
import { RectEye } from './eye/RectEye';
import { RectEyeContainer } from './eyeContainer/RectEyeContainer';
import { HorizontalSegmentRectModules } from './modules/HorizontalSegmentRectModules';

export interface QRCodeProps {
  text: string;

  size?: number;
  colors?: RenderColors<string | number>;

  version?: number;
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;

  backgroundComponent?: React.ComponentType<BackgroundProps>;
  modulesComponent?: React.ComponentType<ModulesProps>;
  eyeContainerComponent?: React.ComponentType<EyeContainerProps>;
  eyeComponent?: React.ComponentType<EyeProps>;

  image?: JSX.Element;
  imageSize?: number;
  renderedImageSize?: number;
}

const finderPatternSize = 7;

export const QRCode = (props: QRCodeProps): JSX.Element => {
  const {
    text,
    version,
    errorCorrectionLevel,
    size: outputSize,
    colors: inputColors,
    backgroundComponent,
    modulesComponent,
    eyeContainerComponent,
    eyeComponent,
    image,
    imageSize,
    renderedImageSize,
  } = props;

  if (image && (!errorCorrectionLevel || ['L', 'low'].includes(errorCorrectionLevel))) {
    console.warn('QRCode: To use an image, set the errorCorrectionLevel to at least medium.');
  }
  if (image && !imageSize) {
    console.warn('To use an image, set the imageSize as well');
  }

  const qrcode = useMemo(() => {
    return QRCodeGenerator.create(text, {
      errorCorrectionLevel,
      version,
    });
  }, [text, errorCorrectionLevel, version]);

  const colors = convertColors(inputColors, [...renderColors]);
  const size: number = qrcode.modules.size;

  const maskedModules = maskModules(qrcode.modules.data, {
    finderPatternSize,
    size,
    maskImage: !!image,
    renderedImageSize,
  });

  const extraProps: React.SVGProps<SVGSVGElement> = {};

  if (outputSize) {
    extraProps.width = outputSize;
    extraProps.height = outputSize;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...extraProps} viewBox={`0 0 ${size} ${size}`} shapeRendering="auto">
      {createElement(backgroundComponent, {
        size,
        color: colors.background,
      })}
      {createElement(modulesComponent, {
        modules: maskedModules,
        color: colors.modules,
        size,
        finderPatternSize,
      })}
      <g>
        <FinderPattern
          x={0}
          y={0}
          size={size}
          finderPatternSize={finderPatternSize}
          containerColor={colors.eyeContainer}
          eyeColor={colors.eye}
          backgroundColor={colors.background}
          eyeContainerComponent={eyeContainerComponent}
          eyeComponent={eyeComponent}
        />
        <FinderPattern
          x={0}
          y={size - finderPatternSize}
          size={size}
          finderPatternSize={finderPatternSize}
          containerColor={colors.eyeContainer}
          backgroundColor={colors.background}
          eyeColor={colors.eye}
          eyeContainerComponent={eyeContainerComponent}
          eyeComponent={eyeComponent}
        />
        <FinderPattern
          x={size - finderPatternSize}
          y={0}
          size={size}
          finderPatternSize={finderPatternSize}
          containerColor={colors.eyeContainer}
          backgroundColor={colors.background}
          eyeColor={colors.eye}
          eyeContainerComponent={eyeContainerComponent}
          eyeComponent={eyeComponent}
        />
      </g>
      {image && (
        <g transform={`translate(${size / 2 - renderedImageSize / 2} ${size / 2 - renderedImageSize / 2}) scale(${8 / imageSize})`}>
          {image}
        </g>
      )}
    </svg>
  );
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
QRCode.defaultProps = {
  size: 512,
  colors: {
    eyeContainer: '#000',
    eye: '#000',
    background: '#fff',
    modules: '#000',
  },
  renderedImageSize: 8,
  backgroundComponent: Background,
  modulesComponent: HorizontalSegmentRectModules,
  eyeContainerComponent: RectEyeContainer,
  eyeComponent: RectEye,
} as Partial<QRCodeProps>;
