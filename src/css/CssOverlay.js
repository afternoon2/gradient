import Overlay from '../Overlay'

/**
 * @class CssOverlay
 * @extends Overlay
 * @classdesc
 * @param {number[][]} colors
 * @param {object} options
 * Css overlay class that returns single gradient strings
 */
export default class CssOverlay extends Overlay {
    constructor(colors, options) {
        super(colors, options)
    }

    /**
     * @returns {string}
     * @description
     * Returns single css gradient string
     */
    get gradient() {
        return `${this.options.type}-gradient(${this._angle}${this._shape}${this._extent}${this._stringifyColors()})`
    }

    /**
     * @returns {string}
     * @private
     */
    get _angle() {
        return this.options.angle && this.options.type === 'linear' ?
            this.options.angle + 'deg, ' :
            ''
    }

    /**
     * @returns {string}
     * @private
     */
    get _shape() {
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

    /**
     * @returns {string}
     * @private
     */
    get _extent() {
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

    /**
     * @returns {string[]}
     * @description
     * Maps rgba arrays to rgba css strings
     * @private
     */
    _stringifyColors() {
        return this.colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ? color[3] : 1})`)
    }
}