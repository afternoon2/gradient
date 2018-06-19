export const SAMPLES = 'Samples'
export const INTERPOLATION = 'Interpolation'
export const MODE = 'Mode'
export const LIGHTNESS_CORRECTION = 'Lightness correction'

const onInterpolation = config => {
    switch (config[INTERPOLATION].value) {
        case 'linear':
            config[MODE].active = true
            break
        case 'bezier':
            config[MODE].active = false
            break
        default:
            return
    }
}

export default onInterpolation