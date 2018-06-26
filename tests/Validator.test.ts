import Validator, {
    IBaseOptions
} from '../src/Validator'

const fakeColors: string[] = [
    'I am not a color!',
    'Me too!'
]

const mixedColors: string[] = [
    'rgba(0, 0, 0, 0.4)',
    '#fcf01f'
]

const options: IBaseOptions = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: false
}

const fakeOptions: any = {
    interpolation: 'No interpolation provided',
    samples: false,
    mode: 'rgb',
    lightnessCorrection: 1
}

// Test colors
test(
    'If validator throws error on invalid colors array',
    () => {
        const validator: Validator = new Validator()
        const safeValidation = (): void => {
            validator.validateColors(fakeColors)
        }
        expect(safeValidation).toThrowError('Wrong input format')
    }
)

test(
    'If validator throws error on mixed color types array',
    () => {
        const validator: Validator = new Validator()
        const safeValidation = (): void => {
            validator.validateColors(mixedColors)
        }
        expect(safeValidation).toThrowError('Colors array contains strings')
    }
)

// Test base options
test(
    'If base options validation throws error on invalid base options object',
    () => {
        const validator = new Validator()
        const safeValidation = (): void => {
            validator.validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid input object')
    }
)