import Overlay from '../Overlay'
import { ICssOptions } from '../Validator'

export default class CssOverlay extends Overlay {
    constructor(
        public input: number[][],
        public options: ICssOptions
    ) {
        super(input, options)
    }

    public get gradient(): string {
        console.log(`
            Type: ${this.config.type}
            Angle: ${this.angle}
            Shape: ${this.shape}
            Extent: ${this.extent}
        `)
        return `${this.config.type}-gradient(${this.angle}${this.shape}${this.extent}${this.stringifyColors()})`
    }

    private get angle(): string {
        return this.config.angle && this.config.type === 'linear' ?
            this.config.angle + 'deg, ' :
            ''
    }

    private get shape(): string {
        if (this.config.type === 'radial') {
            if (
                this.config.shape &&
                this.config.shape !== 'ellipse' &&
                (!this.config.top && !this.config.left)
            ) {
                return this.config.shape + ', '
            }
            if (
                this.config.shape &&
                this.config.shape !== 'ellipse' &&
                (this.config.top && this.config.left)
            ) {
                return `${this.config.shape} at ${this.config.left}% ${this.config.top}%, `
            }
            if (
                this.config.shape &&
                this.config.shape === 'ellipse' &&
                (this.config.top && this.config.left) &&
                this.config.extent === 'none'
            ) {
                return `${this.config.shape} at ${this.config.left}% ${this.config.top}%, `
            }
            if (
                this.config.shape &&
                this.config.shape === 'ellipse' &&
                (this.config.top && this.config.left) &&
                this.config.extent !== 'none'
            ) {
                return ''
            }
        }
        return ''
    }

    private get extent(): string {
        const afterExtent = this.config.top && this.config.left ?
            ` at ${this.config.left}% ${this.config.top}%, ` :
            ', '
        if (
            this.config.shape === 'ellipse' &&
            this.config.extent &&
            this.config.extent !== 'none'
        ) {
            return this.config.extent + afterExtent
        } else if (
            this.config.shape === 'ellipse' &&
            !this.config.extent &&
            this.config.top &&
            this.config.left
        ) {
            return afterExtent
        }
        return ''
    }

    private stringifyColors(): string[] {
        return this.colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`)
    }
}