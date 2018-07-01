import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import eslintConf from './.eslintrc.json'

const babelConf = { 
    exclude: ['/node_modules/'], 
    plugins: ['external-helpers']
}

export default {
    external: ['chroma-js'],
    globals: {
        'chroma-js': 'chroma'
    },
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            file: './dist/gradient-maker.umd.js',
            name: 'GradientMaker',
            sourcemap: true
        },
        {
            format: 'es',
            file: './dist/gradient-maker.esm.js',
            name: 'GradientMaker', 
            sourcemap: true
        }
    ],
    watch: {
        include: 'src/**'
    },
    plugins: [
        resolve(),
        eslint(eslintConf),
        babel(babelConf),
        cleanup({
            comments: 'none',
            extensions: '.js'
        }),
        commonjs()
    ]
}