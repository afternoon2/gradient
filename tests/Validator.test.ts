import Validator, {
    ValidatorOptions
} from '../src/Validator'

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

const opts: ValidatorOptions = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: true
}

const optsToCorrect: ValidatorOptions = {
    interpolation: 'bezier',
    samples: 10,
    mode: 'lab',
    lightnessCorrection: false
}

const optsCorrected: ValidatorOptions = {
    interpolation: 'bezier',
    samples: 10,
    mode: 'none',
    lightnessCorrection: false
}

const fakeOpts: ValidatorOptions = {
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
            const validator: Validator = new Validator(fakeInputs, opts)
        }
        expect(safeValidate).toThrowError(errorMessagePart)
    }
)

test(
    'If input colors validation changes hex values in mixed arrays into rgba strings',
    () => {
        const hex: RegExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        const validator: Validator = new Validator(mixedInputs, opts)
        expect(validator.inputs.findIndex(color => hex.test(color))).toBe(-1)
    }
)

test(
    'If input colors validation converts all hex values into rgba strings',
    () => {
        const rgba: RegExp = /rgba\(([0-9]+,\s)([0-9]+,\s)([0-9]+,\s)([0-9]?\.?[0-9]\))/
        const validator: Validator = new Validator(hexInputs, opts)
        const firstIsValid: boolean = rgba.test(validator.inputs[0])
        const secondIsValid: boolean = rgba.test(validator.inputs[1])

        expect(firstIsValid).toEqual(true)
        expect(secondIsValid).toEqual(true)
    }
)

test(
    'If options validation makes a valid correction of the color mode',
    () => {
        const validator: Validator = new Validator(rgbaInputs, optsToCorrect)
        expect(validator.configuration).toEqual(optsCorrected)
    }
)

test(
    'If options validation throws an error after receiving invalid options object',
    () => {
        const safe = (): void => {
            const validator: Validator = new Validator(rgbaInputs, fakeOpts)
        }
        expect(safe).toThrowError('Invalid input object')
    }
)