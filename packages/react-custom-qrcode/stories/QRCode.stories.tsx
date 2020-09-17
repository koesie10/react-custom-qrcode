import React from 'react';

import { Meta, Story } from '@storybook/react/types-6-0';

import {
  Background,
  CircleEye,
  CircleModules,
  HorizontalSegmentRectModules,
  QRCode,
  QRCodeProps,
  RectEye,
  RectEyeContainer,
  RectModules,
  RoundedRectEyeContainer,
} from '../src';
import { HouseLogo } from './HouseLogo';

type QRCodeStoryProps = Omit<QRCodeProps, 'colors' | 'eyeComponent' | 'eyeContainerComponent' | 'modulesComponent' | 'image'> & {
  eyeContainerColor: string;
  eyeColor: string;
  backgroundColor: string;
  modulesColor: string;

  eyeComponent: string;
  eyeContainerComponent: string;
  modulesComponent: string;

  image: string;
};

const EyeComponents = { RectEye, CircleEye };
const EyeContainerComponents = { RectEyeContainer, RoundedRectEyeContainer };
const ModulesComponents = { HorizontalSegmentRectModules, CircleModules, RectModules };
const ImageComponents = { HouseLogo: <HouseLogo /> };

export default {
  title: 'React Custom QRCode/QRCode',
  component: QRCode,
  decorators: [
    (Story) => (
      <div style={{ margin: '1em' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    backgroundComponent: Background,
    modulesComponent: 'HorizontalSegmentRectModules',
    eyeContainerComponent: 'RectEyeContainer',
    eyeComponent: 'RectEye',
    errorCorrectionLevel: 'M',
    eyeContainerColor: 'rgba(0, 0, 0, 1)',
    eyeColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    modulesColor: 'rgba(0, 0, 0, 1)',
    image: null,
    imageSize: 512,
    renderedImageSize: 8,
  },
  argTypes: {
    text: null,
    eyeContainerColor: { control: { type: 'color' } },
    eyeColor: { control: { type: 'color' } },
    backgroundColor: { control: { type: 'color' } },
    modulesColor: { control: { type: 'color' } },
    size: {
      control: { type: 'range', min: 21, max: 1024 },
    },
    errorCorrectionLevel: {
      control: {
        type: 'inline-radio',
        options: ['L', 'M', 'Q', 'H'],
      },
    },
    eyeComponent: {
      control: {
        type: 'select',
        options: Object.keys(EyeComponents),
      },
    },
    eyeContainerComponent: {
      control: {
        type: 'select',
        options: Object.keys(EyeContainerComponents),
      },
    },
    modulesComponent: {
      control: {
        type: 'select',
        options: Object.keys(ModulesComponents),
      },
    },
    image: {
      control: {
        type: 'select',
        options: Object.keys(ImageComponents),
      },
    },
    renderedImageSize: {
      control: { type: 'range', min: 0, max: 10 },
    },
    colors: { table: { disable: true } },
    backgroundComponent: { table: { disable: true } },
    version: {
      control: { type: 'range', min: 1, max: 40 },
    },
  },
} as Meta;

function rgba2hex(rgb: string): string {
  const components = rgb.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i);

  if (!components) {
    return '#000';
  }

  return `#${('0' + parseInt(components[1], 10).toString(16)).slice(-2)}${('0' + parseInt(components[2], 10).toString(16)).slice(-2)}${(
    '0' + parseInt(components[3], 10).toString(16)
  ).slice(-2)}${('0' + Math.floor(parseFloat(components[4]) * 255).toString(16)).slice(-2)}`;
}

const Template: Story<QRCodeStoryProps> = (args) => {
  const colors = {
    eyeContainer: rgba2hex(args.eyeContainerColor),
    eye: rgba2hex(args.eyeColor),
    background: rgba2hex(args.backgroundColor),
    modules: rgba2hex(args.modulesColor),
  };

  return (
    <QRCode
      {...args}
      colors={colors}
      eyeComponent={EyeComponents[args.eyeComponent]}
      eyeContainerComponent={EyeContainerComponents[args.eyeContainerComponent]}
      modulesComponent={ModulesComponents[args.modulesComponent]}
      image={ImageComponents[args.image]}
    />
  );
};

export const Classic = Template.bind({});
Classic.args = {
  text: 'Sample text',
};

export const Custom = Template.bind({});
Custom.args = {
  text: 'Sample text',
  errorCorrectionLevel: 'H',
  eyeComponent: 'CircleEye',
  eyeContainerComponent: 'RoundedRectEyeContainer',
  modulesComponent: 'CircleModules',
  eyeContainerColor: 'rgba(41, 128, 185,1.0)',
  eyeColor: 'rgba(52, 152, 219,1.0)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  modulesColor: 'rgba(142, 68, 173,1.0)',
  image: 'HouseLogo',
  renderedImageSize: 8,
  version: 3,
};
