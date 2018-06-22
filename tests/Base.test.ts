import {
    Scale,
    Color
} from 'chroma-js'
import {
    Base,
    IColor,
    IBaseOptions
} from '../src/Base'

let base1: Base

beforeEach(() => {
    const input: IColor[] = [
        {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        },
        {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }
    ]
    const options: IBaseOptions = {
        samples: 10,
        interpolation: 'bezier',
        mode: 'lch',
        lightnessCorrection: false
    }
    base1 = new Base(input, options)
})

test('Length of the base array', () => {
    const generatedBase = base1.generate()
    expect(generatedBase.length).toEqual(10)
})