import resolve from 'rollup-plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import imageBase64 from 'rollup-plugin-image-base64';

import commonConfig from './rollup.config.common.js';

const { input, cssExtract } = commonConfig;

export default {
    input,
    output: [
        {
            file: 'lib/index.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'es/index.js',
            format: 'es',
            sourcemap: true
        }
    ],
    external: ['react', 'react-dom'],
    plugins: [
        imageBase64(),
        resolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        postcss({
            extract: cssExtract,
            plugins: [cssnano()]
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        uglify(),
        filesize(),
        visualizer({
            filename: 'visualizer/index.html'
        })
    ]
};
