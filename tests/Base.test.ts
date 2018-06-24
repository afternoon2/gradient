import Base, {
    BaseOptions
} from '../src/Base'

const hexInputs: string[] = [
    '#ffcc00',
    '#d39f00'
]

const mixedInputs: string[] = [
    'rgba(0, 244, 44, 0.3)',
    '#d39f00'
]

const rgbaInputs: string[] = [
    'rgba(0, 244, 44, 0.3)',
    'rgba(0, 244, 44, 0.3)'
]

const fakeInputs: string[] = [
    'I am not hex color',
    'I am not rgba color'
]

const opts: BaseOptions = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: true
}

const optsToCorrect: BaseOptions = {
    interpolation: 'bezier',
    samples: 10,
    mode: 'lab',
    lightnessCorrection: false
}

const optsCorrected: BaseOptions = {
    interpolation: 'bezier',
    samples: 10,
    mode: 'none',
    lightnessCorrection: false
}

const fakeOpts: BaseOptions = {
    interpolation: 'I am not the interpolation, lol',
    samples: 10,
    mode: 'I am not a mode, huh',
    lightnessCorrection: false
}

const errorMessagePart: string = 'Wrong input format.'

test(
    'If input colors validation throws error on wrong string type',
    () => {
        const safeValidate: any = (): void => {
            const base: Base = new Base(fakeInputs, opts)
        }
        expect(safeValidate).toThrowError(errorMessagePart)
    }
)

test(
    'If input colors validation changes hex values in mixed arrays into rgba strings',
    () => {
        const hex: RegExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        const base: Base = new Base(mixedInputs, opts)
        expect(base.inputs.findIndex(color => hex.test(color))).toBe(-1)
    }
)

test(
    'If input colors validation converts all hex values into rgba strings',
    () => {
        const rgba: RegExp = /rgba\(([0-9]+,\s)([0-9]+,\s)([0-9]+,\s)([0-9]?\.?[0-9]\))/
        const base: Base = new Base(hexInputs, opts)
        const firstIsValid: boolean = rgba.test(base.inputs[0])
        const secondIsValid: boolean = rgba.test(base.inputs[1])

        expect(firstIsValid).toEqual(true)
        expect(secondIsValid).toEqual(true)
    }
)

test(
    'If options validation makes a valid correction of the color mode',
    () => {
        const base: Base = new Base(rgbaInputs, optsToCorrect)
        expect(base.configuration).toEqual(optsCorrected)
    }
)

test(
    'If options validation throws an error after receiving invalid options object',
    () => {
        const safe = (): void => {
            const base: Base = new Base(rgbaInputs, fakeOpts)
        }
        expect(safe).toThrowError('Invalid input object')
    }
)