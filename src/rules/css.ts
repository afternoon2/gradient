export const OPACITY = 'Opacity'
export const CSS_GRADIENT_TYPE = 'Css gradient type'
export const POSITION = 'Position'
export const TOP = 'Top'
export const LEFT = 'Left'
export const SHAPE = 'Shape'
export const EXTENT_KEYWORD = 'Extent keyword'
export const WITH_ANGLE = 'With angle'
export const ANGLE = 'Angle'

const onLinearGradient = config => {
    config[WITH_ANGLE].active = true
    config[SHAPE].active = false
    config[EXTENT_KEYWORD].active = false
    config[POSITION].active = false
    config[TOP].active = false
    config[LEFT].active = false
}

const onRadialGradient = config => {
    config[WITH_ANGLE].active = false
    config[ANGLE].active = false
    config[POSITION].active = true
}

const onWithAngle = config => {
    config[WITH_ANGLE].active ?
        config[ANGLE].active = true :
        config[ANGLE].active = false
}

const onPosition = config => {
    if (config[POSITION].active) {
        config[TOP].active = true
        config[LEFT].active = true
    }
    config[TOP].active = false
    config[LEFT].active = false
}

const onShape = config => {
    switch (config[SHAPE].value) {
        case 'circle':
            config[EXTENT_KEYWORD].active = false
            break
        case 'ellipse':
            config[EXTENT_KEYWORD].active = true
            break
        default:
            return
    }
}

const onGradientType = config => {
    switch (config[CSS_GRADIENT_TYPE].value) {
        case 'linear':
            onLinearGradient(config)
            onWithAngle(config)
            break
        case 'radial':
            onRadialGradient(config)
            onPosition(config)
            onShape(config)
            break
        default:
            return
    }
}

export default onGradientType