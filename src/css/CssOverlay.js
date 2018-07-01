import Overlay from '../Overlay'

export default class CssOverlay extends Overlay {
    constructor(colors, options) {
        super(colors, options)
    }

    get gradient() {
        return `${this.options.type}-gradient(${this.angle}${this.shape}${this.extent}${this.stringifyColors()})`
    }

    get angle() {
        return this.options.angle && this.options.type === 'linear' ?
            this.options.angle + 'deg, ' :
            ''
    }

    get shape() {
        if (this.options.type === 'radial') {
            if (
                this.options.shape &&
                this.options.shape !== 'ellipse' &&
                (!this.options.top && !this.options.left)
            ) {
                return this.options.shape + ', '
            }
            if (
                this.options.shape &&
                this.options.shape !== 'ellipse' &&
                (this.options.top && this.options.left)
            ) {
                return `${this.options.shape} at ${this.options.left}% ${this.options.top}%, `
            }
            if (
                this.options.shape &&
                this.options.shape === 'ellipse' &&
                (this.options.top && this.options.left) &&
                this.options.extent === 'none'
            ) {
                return `${this.options.shape} at ${this.options.left}% ${this.options.top}%, `
            }
            if (
                this.options.shape &&
                this.options.shape === 'ellipse' &&
                (this.options.top && this.options.left) &&
                this.options.extent !== 'none'
            ) {
                return ''
            }
        }
        return ''
    }

    get extent() {
        const afterExtent = this.options.top && this.options.left ?
            ` at ${this.options.left}% ${this.options.top}%, ` :
            ', '
        if (
            this.options.shape === 'ellipse' &&
            this.options.extent &&
            this.options.extent !== 'none'
        ) {
            return this.options.extent + afterExtent
        } else if (
            this.options.shape === 'ellipse' &&
            !this.options.extent &&
            this.options.top &&
            this.options.left
        ) {
            return afterExtent
        }
        return ''
    }

    stringifyColors() {
        return this.colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ? color[3] : 1})`)
    }
}