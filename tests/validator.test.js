import Validator from '../src/Validator'

let validator

beforeEach(() => {
    validator = new Validator()
})

// Test colors
test(
    '[base] If validator throws error on invalid colors array',
    () => {
        const fakeColors = [
            'I am not a color!',
            [0, 1]
        ]
        const safeValidation = () => {
            validator._validateColors(fakeColors)
        }
        expect(safeValidation).toThrowError('Wrong input format')
    }
)

// Test base options
test(
    '[base] If base options validation throws an error on invalid base options object',
    () => {
        const fakeOptions = {
            interpolation: 'No interpolation provided',
            samples: false,
            mode: 'rgb',
            lightnessCorrection: 1
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid input object')
    }
)

// Test css options
test(
    'If validator throws an error when there is no css gradient type provided',
    () => {
        const fakeOptions = {
            shape: 'circle'
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid options ')
    }
)

test(
    'If validator throws an error when there is no css radial gradient shape provided',
    () => {
        const fakeOptions = {
            type: 'radial',
            top: 10,
            left: 20
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('No shape provided')
    }
)

test(
    'If validator throws an error when there are invalid angle property provided',
    () => {
        const fakeOptions = {
            type: 'radial',
            shape: 'circle',
            angle: 710
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid angle property provided')
    }
)

test(
    'If validator throws an error when there are invalid top or left properties provided',
    () => {
        const fakeOptions = {
            type: 'radial',
            shape: 'circle',
            top: 1110,
            left: 2000000
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid top and/or left properties')
    }
)

// Svg options 
test(
    'If validator throws an error on invalid svg gradient type',
    () => {
        const fakeOptions = {
            type: 'fakeType',
            id: 'some id',
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid svg gradient type')
    }
)

test(
    'If validator throws an error on invalid identifier',
    () => {
        const fakeOptions = {
            type: 'linear',
            id: 122,
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid svg gradient identifier')
    }
)

test(
    'If validator throws an error when the svg gradient type is radial while there are invalid coordinates provided',
    () => {
        const fakeOptions = {
            type: 'radial',
            id: 'identifier',
            cx: 'some string',
            cy: 0,
            r: 10
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Missing svg radial gradient\'s coord')
    }
)

test(
    'If validator throws an error when the svg gradient type is radial while there is invalid spread method property provided',
    () => {
        const fakeOptions = {
            type: 'radial',
            id: 'identifier',
            cx: 0,
            cy: 0,
            r: 10,
            spreadMethod: 'some other spread method'
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid spread method property ')
    }
)

test(
    'If validator throws an error when the svg gradient type is radial and the focal point coordinates are invalid',
    () => {
        const fakeOptions = {
            type: 'radial',
            id: 'id',
            cx: 0,
            cy: 0,
            r: 20,
            fx: 'some',
            fy: 'fake focal'
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid focal point coordinates')
    }
)

test(
    'If validator throws an error when the svg gradient units are invalid',
    () => {
        const fakeOptions = {
            type: 'linear',
            id: 'id',
            gradientUnits: 'nope'
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid gradient units')
    }
)

test(
    'If validator throws an error when the svg gradient angle is invalid',
    () => {
        const fakeOptions = {
            type: 'linear',
            id: 'id',
            angle: 'I am not an angle value'
        }
        const safeValidation = () => {
            validator._validateOptions(fakeOptions)
        }
        expect(safeValidation).toThrowError('Invalid angle property')
    }
)

