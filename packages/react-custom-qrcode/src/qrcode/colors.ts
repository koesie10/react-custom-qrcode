export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
}

export const renderColors = ['modules', 'eye', 'eyeContainer', 'background'];
export interface RenderColors<T> {
  modules: T;
  eye: T;
  eyeContainer: T;
  background: T;
}

const hex2rgba = (hex: number | string): Color => {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string');
  }

  let hexCode = hex.slice().replace('#', '').split('');
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex);
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply(
      [],
      hexCode.map(function (c) {
        return [c, c];
      })
    );
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F');

  const hexValue = parseInt(hexCode.join(''), 16);

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join(''),
  };
};

type ConvertedColors<T extends {}> = {
  [P in keyof T]: Color;
};

export const convertColors = <T extends RenderColors<string | number>>(colors: T, colorNames = renderColors): ConvertedColors<T> =>
  colorNames.reduce((acc, colorName) => {
    acc[colorName] = hex2rgba(colors?.[colorName]);
    return acc;
  }, {}) as ConvertedColors<T>;
