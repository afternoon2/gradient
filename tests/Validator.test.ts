/* tslint:disable */
import Validator, {
    IBaseOptions
} from '../src/Validator'

let validator: Validator

beforeEach(() => {
    validator = new Validator()
})

// Test colors
test(
    '[base] If validator throws error on invalid colors array',
    () => {
        const fakeColors: string[] = [
            'I am not a color!',
            'Me too!'
        ]
        const safeValidation = (): void => {
            validator.validateColors(fakeColors)
        }
        expect(safeValidation).toThrowError('Wrong input format')
    }
)

test(
    '[base] If validator throws error on mixed color types array',
    () => {
        const mixedColors: string[] = [
            'rgba(0, 0, 0, 0.4)',
            '#fcf01f'
        ]
        const safeValidation = (): void => {
            validator.validateColors(mixedColors)
        }
        expect(safeValidation).toThrowError('Colors array contains strings')
    }
)

// Test base options
test(
    '[base] If base options validation throws an error on invalid base options object',
    () => {
        const fakeOptions: any = {
            interpolation: 'No interpolation provided',
            samples: false,
            mode: 'rgb',
            lightnessCorrection: 1
        }
        const safeValidation = (): void => {
            validator.validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid input object')
    }
)