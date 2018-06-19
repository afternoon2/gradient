import onGradientType from './css'
import onInterpolation from './chroma'

export interface IConfigEntry {
    name: string,
    type: string,
    value: any
    active: boolean
    items?: string[] | number[]
}

const rules = (config: any, mode: string) => {
    onInterpolation(config)
    switch (mode) {
        case 'css':
            onGradientType(config)
            break
        default:
            return
    }
}

export default rules