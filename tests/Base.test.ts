import { BaseOptions } from '../src/Validator'
import Base from '../src/Base'

const colors: string[] = [
    'rgba(9, 9, 9, 0.5)',
    'rgba(255, 255, 240, 1)'
]

const opts: BaseOptions = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: false
}

test(
    'If Base component generates a base of valid length',
    () => {
        const base: Base = new Base(colors, opts)
        const baseResult: number[][] = base.generate()
        expect(baseResult.length).toBe(opts.samples)
    }
)

test(
    'If Base component generates a base as an array of arrays of numbers',
    () => {
        const base: Base = new Base(colors, opts)
        const baseResult: number[][] = base.generate()
        expect(Array.isArray(baseResult[0])).toBe(true)
        expect(baseResult[0].length).toBe(4)
        expect(typeof baseResult[0][0]).toBe('number')
    }
)