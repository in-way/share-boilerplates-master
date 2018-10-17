import resolve from 'rollup-plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import imageBase64 from 'rollup-plugin-image-base64';

import commonConfig from './rollup.config.common.js';

const { input, cssExtract } = commonConfig;

export default {
    input,
    output: [
        {
            file: 'src/lib/index.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'src/es/index.js',
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
            extract: cssExtract
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    ],
    watch: {
        include: 'src/**',
        exclude: 'node_modules/**'
    }
};
