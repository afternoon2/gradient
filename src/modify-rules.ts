import {
    INTERPOLATION,
    MODE
} from './sets/chroma-set'

import {
    CSS_GRADIENT_TYPE,
    WITH_ANGLE,
    SHAPE,
    EXTENT_KEYWORD,
    TOP,
    LEFT,
    ANGLE,
    POSITION
} from './sets/css-set'

export interface IConfigEntry {
    name: string,
    type: string,
    value: any
    active: boolean
    items?: string[] | number[]
}

declare type IConfig = IConfigEntry[]

const onInterpolation = (config: IConfig) => {
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

const onGradientType = (config: IConfig) => {
    switch (config[CSS_GRADIENT_TYPE].value) {
        case 'linear':
            onLinearGradient(config)
            onWithAngle(config)
            break
        case 'radial':
            onRadialGradient(config)
            onPosition(config)
            onShape(config)
    }
}

const onLinearGradient = (config: IConfig) => {
    config[WITH_ANGLE].active = true
    config[SHAPE].active = false
    config[EXTENT_KEYWORD].active = false
    config[POSITION].active = false
    config[TOP].active = false
    config[LEFT].active = false
}

const onRadialGradient = (config: IConfig) => {
    config[WITH_ANGLE].active = false
    config[ANGLE].active = false
    config[POSITION].active = true
}

const onWithAngle = (config: IConfig) => {
    config[WITH_ANGLE].active ?
        config[ANGLE].active = true :
        config[ANGLE].active = false
}

const onPosition = (config: IConfig) => {
    if (config[POSITION].active) {
        config[TOP].active = true
        config[LEFT].active = true
    }
    config[TOP].active = false
    config[LEFT].active = false
}

const onShape = (config: IConfig) => {
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

const modifyRules = (config: IConfig) => {
    onInterpolation(config)
    onGradientType(config)
}

export default modifyRules