import Base from '../src/base/Base'

const colors = [
    'rgba(9, 9, 9, 0.5)',
    'rgba(255, 255, 240, 1)'
]

const opts = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: false
}

test(
    'If Base component generates a base of valid length',
    () => {
        const base = new Base(colors, opts)
        const baseResult = base.base
        expect(baseResult.length).toBe(opts.samples)
    }
)

test(
    'If Base component generates a base as an array of arrays of numbers',
    () => {
        const base= new Base(colors, opts)
        const baseResult = base.base
        expect(Array.isArray(baseResult[0])).toBe(true)
        expect(baseResult[0].length).toBe(4)
        expect(typeof baseResult[0][0]).toBe('number')
    }
)