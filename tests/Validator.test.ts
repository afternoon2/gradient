/* tslint:disable */
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

const fakeOptions: any = {
    interpolation: 'No interpolation provided',
    samples: false,
    mode: 'rgb',
    lightnessCorrection: 1
}

// Test colors
test(
    '[base] If validator throws error on invalid colors array',
    () => {
        const validator: Validator = new Validator()
        const safeValidation = (): void => {
            validator.validateColors(fakeColors)
        }
        expect(safeValidation).toThrowError('Wrong input format')
    }
)

test(
    '[base] If validator throws error on mixed color types array',
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
    '[base] If base options validation throws an error on invalid base options object',
    () => {
        const validator = new Validator()
        const safeValidation = (): void => {
            validator.validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid input object')
    }
)

// Test css options
test(
    'If css options validation throws an error on invalid gradient type',
    () => {
        const fakeGradientTypeOpts = {
            gradientType: 'none',
            meta: {
                withAngle: true,
                angle: 80
            }
        }
        const validator = new Validator()
        const safeValidation = (): void => {
            validator.validateOptions(fakeGradientTypeOpts)
        }
        expect(safeValidation).toThrowError('Missing gradient type property ')
    }
)

test(
    '[css-linear-gradient] If validator throws an error when there is no withAngle property in the meta entry',
    () => {
        const fakeConfig = {
            gradientType: 'linear',
            meta: {
                angle: 20
            }
        }
        const validator: Validator = new Validator()
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Missing withAngle property')
    }
)

test(
    '[css-linear-gradient] If validator warns about falsy withAngle property when the angle property is present and correct',
    () => {
        const spy = jest.spyOn(global.console, 'warn')
        const fakeConfig = {
            gradientType: 'linear',
            meta: {
                withAngle: false,
                angle: 20
            }
        }
        const validator: Validator = new Validator()
        validator.validateOptions(fakeConfig)
        expect(spy).toHaveBeenCalled()
        spy.mockReset()
        spy.mockRestore()
    }
)

test(
    '[css-linear-gradient] If validator throws an error when there is withAngle option set to true, but there is no angle value provided',
    () => {
        const fakeConfig = {
            gradientType: 'linear',
            meta: {
                withAngle: true,
                angle: null
            }
        }
        const validator: Validator = new Validator()
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Missing angle property in css configuration')
    }
)