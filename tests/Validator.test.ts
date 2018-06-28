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

// Test css options
test(
    '[css-linear-gradient] If validator throws an error on invalid gradient type',
    () => {
        const fakeGradientTypeOpts = {
            gradientType: 'none',
            meta: {
                withAngle: true,
                angle: 80
            }
        }
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
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Missing angle property in css configuration')
    }
)

test(
    '[css-radial-gradient] If the validator throws an error when there is no position property provided',
    () => {
        const spy = jest.spyOn(global.console, 'warn')
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                top: 90,
                left: 10,
                shape: 'ellipse',
                extentKeyword: 'none'
            }
        }
        validator.validateOptions(fakeConfig)
        expect(spy).toHaveBeenCalled()
        spy.mockReset()
        spy.mockRestore()
    }
)

test(
    '[css-radial-gradient] If the validator throws an error when there is invalid position property provided',
    () => {
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                position: 'nope',
                left: 10,
                top: 10
            }
        }
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Invalid position property')
    }
)

test(
    '[css-radial-gradient] If validator throws an error when there is top or left property missing while position is set properly',
    () => {
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                position: true,
                top: 0,
                left: null,
            }
        }
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Top or left radial gradient property')
    }
)

test(
    '[css-radial-gradient] If the validator throws an error when there is no shape property provided',
    () => {
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                position: false
            }
        }
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Shape property is')
    }
)

test(
    '[css-radial-gradient] If the validator throws an error when there is invalid shape property provided',
    () => {
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                position: false,
                shape: false
            }
        }
        const safeValidation = (): void => {
            validator.validateOptions(fakeConfig)
        }
        expect(safeValidation).toThrowError('Invalid shape property provided')
    }
)

test(
    '[css-radial-gradient] If the validator throws a warning when the shape is set to "ellipse" but the extentKeyword is other than "none"',
    () => {
        const spy = jest.spyOn(global.console, 'warn')
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                position: false,
                shape: 'ellipse',
                extentKeyword: 'farthest-corner'
            }
        }
        validator.validateOptions(fakeConfig)
        expect(spy).toHaveBeenCalled()
        spy.mockReset()
        spy.mockRestore()
    }
)

test(
    '[css-radial-gradient] If the validator throws a warning when the shape is set to "circle" but the extentKeyword is other than "none"',
    () => {
        const spy = jest.spyOn(global.console, 'warn')
        const fakeConfig = {
            gradientType: 'radial',
            meta: {
                position: false,
                shape: 'circle',
                extentKeyword: 'farthest-corner'
            }
        }
        validator.validateOptions(fakeConfig)
        expect(spy).toHaveBeenCalled()
        spy.mockReset()
        spy.mockRestore()
    }
)