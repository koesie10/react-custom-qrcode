import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import * as path from 'path';

import pkg from './package.json';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

const external = ['react', 'qrcode'];
const commonPlugins = [
    resolve({extensions, browser: true}),
    commonjs(),
];
const babelPlugin = babel({
    extensions,
    babelHelpers: 'bundled',
    plugins: ['@babel/plugin-proposal-optional-chaining'],
    presets: [
        ['@babel/preset-env', {
            loose: true,
            modules: false,
            targets: '>1%, not dead, not ie 11, not op_mini all'
        }],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ]
});

const config = {
    input: 'react-custom-qrcode.ts',
    output: {
        file: pkg.main,
        format: 'cjs',
    },
    external: ['react', 'qrcode'],
    plugins: [
        ...commonPlugins,
        babelPlugin,
    ]
};

const declarationConfig = {
    input: 'react-custom-qrcode.ts',
    output: [
        {
            dir: path.dirname(pkg.module),
            format: 'es',
        },
    ],
    external,
    plugins: [
        ...commonPlugins,
        typescript({
            tsconfig: 'tsconfig.build.json',
            declaration: true,
            declarationDir: path.dirname(pkg.module),
        }),
        babelPlugin,
    ]
};

export default [config, declarationConfig];
