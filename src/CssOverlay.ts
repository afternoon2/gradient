import Overlay from './Overlay'
import { ICssOptions } from './Validator'

export default class CssOverlay extends Overlay {
    constructor(
        public input: number[][],
        public options: ICssOptions
    ) {
        super(input, options)
    }

    public createGradient(): string {
        return `${this.options.gradientType}-gradient(${this.angle}${this.shape}${this.extent}${this.input})`
    }

    private get angle(): string {
        const meta = this.options.meta
        return meta.angle && meta.withAngle && this.options.gradientType === 'linear' ?
            meta.angle + 'deg, ' :
            ''
    }

    private get shape(): string {
        const meta = this.options.meta
        if (this.options.gradientType === 'radial') {
            if (
                meta.shape === 'ellipse' && 
                meta.position === false
            ) {
                return meta.shape + ', '
            }

            if (
                meta.shape === 'ellipse' &&
                meta.position === true
            ) {
                return `${meta.shape} at ${meta.left} ${meta.top}, `
            }

            if (
                meta.shape === 'ellipse' &&
                meta.position === true &&
                meta.extentKeyword === 'none'
            ) {
                return `${meta.shape} at ${meta.left}% ${meta.top}%, `
            }

            if (
                meta.shape === 'ellipse' &&
                meta.position === true &&
                meta.extentKeyword !== 'none'
            ) {
                return ''
            }
        }
        return ''
    }

    private get extent(): string {
        const meta = this.options.meta
        const afterExtent: string = meta.position === true ?
            ` at ${meta.left}% ${meta.left.top}%, ` :
            ', '
        if (meta.extentKeyword !== 'none') {
            return meta.extentKeyword + afterExtent
        }
        return ''
    }
}