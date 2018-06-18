import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import tslint from 'rollup-plugin-tslint'

export default {
    entry: './src/gradient-maker.ts',
    output: [
        {
            format: 'es',
            file: './dist/gradient-maker.esm.js',
            name: 'GradientMaker',
            sourcemap: true
        },
        {
            format: 'umd',
            file: './dist/gradient-maker.umd.js',
            name: 'GradientMaker',
            sourcemaps: true
        }
    ],
    watch: {
        include: 'src/**'
    },
    plugins: [
        typescript({
            config: './tsconfig.json',
            rollupCommonJSResolveHack: true,
            module: 'ESNext'
        }),
        tslint({
            options: {
                configuration: './tslint.json'
            }
        }),
        node(),
        commonjs(),
        cleanup(),
    ]
}