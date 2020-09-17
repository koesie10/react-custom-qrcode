import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

const config = {
    input: 'src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        }, {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: ['react', 'qrcode'],
    plugins: [
        resolve({extensions}),
        commonjs(),
        babel({
            extensions,
            babelHelpers: 'runtime',
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-optional-chaining'],
            presets: [
                ['@babel/preset-env', { loose: true, modules: false, targets: '>1%, not dead, not ie 11, not op_mini all' }],
                '@babel/preset-typescript',
                '@babel/preset-react'
            ]
        })
    ]
};

export default config;
