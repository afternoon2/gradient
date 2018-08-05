import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import eslintConf from './.eslintrc.json'
import { terser } from 'rollup-plugin-terser'

const babelConf = { 
    exclude: ['/node_modules/'], 
    plugins: ['external-helpers']
}

export default {
    external: ['chroma-js'],
    input: './index.js',
    output: [
        {
            format: 'umd',
            file: './gradient.js',
            name: 'Gradient',
            globals: {
                'chroma-js': 'chroma'
            }
        }
    ],
    watch: {
        include: 'src/**'
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint(eslintConf),
        babel(babelConf),
        cleanup({
            comments: 'none',
            extensions: '.js'
        }),
        terser()
    ]
}