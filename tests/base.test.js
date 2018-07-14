import Base from '../src/base/Base'

const opts = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: true
}

test(
    'If Base component generates a base of valid length',
    () => {
        const colors = [
            [9, 9, 9, 0.5],
            [255, 255, 240, 1]
        ]
        const base = new Base(colors, opts)
        const baseResult = base.base
        expect(baseResult.length).toBe(opts.samples)
    }
)

test(
    'If Base component generates a base as an array of arrays of numbers',
    () => {
        const cols = [
            [66, 134, 244, 0.6], [244, 241, 65, 0.10]
        ]
        const base= new Base(cols, opts)
        const baseResult = base.base
        expect(Array.isArray(baseResult[0])).toBe(true)
        expect(baseResult[0].length).toBe(4)
        expect(typeof baseResult[0][0]).toBe('number')
    }
)

test(
    'If base creation preserves opacity values',
    () => {
        const colors = [
            [9, 9, 9, 0.5],
            [255, 255, 240, 1]
        ]
        const base = new Base(colors, opts)
        const baseResult = base.base
        const opacityNotPreserved = baseResult
            .findIndex(res => res.length < 4) > -1 ?
            true : false
        expect(opacityNotPreserved).toBe(false)
    }
)