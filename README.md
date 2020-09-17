<h1 align="center">Welcome to react-custom-qrcode 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-custom-qrcode" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-custom-qrcode.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Easily customize QR code rendering to fit your needs

## Install

```sh
yarn add react-custom-qrcode
```

## Documentation

A Storybook is available [here](https://koesie10.github.io/react-custom-qrcode/react-custom-qrcode/index.html).

## Example usage

```typescript jsx
const MyLogo = () => (<>
    <circle cx="256" cy="256" r="254.119" fill={color} />
    <path
      d="M456.812 233.343l-48.895-39.321v-60.13a4.761 4.761 0 00-4.747-4.747h-15.823a4.761 4.761 0 00-4.747 4.748v39.637L271.915 84.286c-9.257-7.516-22.548-7.516-31.805 0L55.213 233.343c-2.057 1.661-2.374 4.668-.712 6.646l9.969 12.342a4.778 4.778 0 006.725.712l32.912-26.504v181.178c0 14.004 11.314 25.318 25.318 25.318H221.2c5.222 0 9.494-4.273 9.494-9.494V319.027l50.635.237v104.593c0 5.222 4.272 9.494 9.494 9.494l91.776-.237c14.004 0 25.317-11.314 25.317-25.318V226.618l32.913 26.504a4.778 4.778 0 006.725-.712l9.969-12.342c1.661-2.057 1.266-5.064-.712-6.725zM382.6 407.796l-75.953.238V303.362c0-5.222-4.272-9.495-9.494-9.495l-82.282-.237c-5.221 0-9.494 4.272-9.494 9.494v104.672h-75.952v-201.67l123.581-99.687a4.655 4.655 0 015.934 0l123.58 99.688v201.67z"
      fill="#fff"
    />
</>);

ReactDOM.render(
  <QRCode
    image={<MyLogo />}
    imageSize={512}
    eyeComponent={CircleEye}
    eyeContainerComponent={RoundedRectEyeContainer}
    modulesComponent={CircleModules}
    colors={{
      background: '#ffffff00',
      modules: '#27ae60',
      eye: '#1b7943',
      eyeContainer: '#13572f',
    }}
    {...props}
  />,
  el
);
```

## Details

Uses [qrcode](https://github.com/soldair/node-qrcode) for creating the QR code.

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/koesie10/react-custom-qrcode/issues). 

## License

Copyright © 2020 [Koen Vlaswinkel](https://github.com/koesie10).<br />
This project is [MIT](https://opensource.org/licenses/MIT) licensed.
