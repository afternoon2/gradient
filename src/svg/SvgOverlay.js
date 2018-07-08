import Overlay from '../Overlay'

/**
 * @typedef {object} SvgOptions - SvgOverlay component's configuration object
 * @property {string} type - linear or radial
 * @property {id} string - gradient unique identifier
 * @property {number} [x1] - linear gradient's first point's position on the x axis
 * @property {number} [y1] - linear gradient's first point's position on the y axis
 * @property {number} [x2] - linear gradient's second point's position on the x axis
 * @property {number} [y2] - linear gradient's second point position on the y axis
 * @property {number} [cx] - radial gradient's center point position on the x axis
 * @property {number} [cy] - radial gradient's center point position on the y axis
 * @property {number} [r] - radial gradient's radius
 * @property {number} [fx] - radial gradient's focal point position on the x axis
 * @property {number} [fy] - radial gradient's focal point position on the y axis
 * @property {string} [spreadMethod] - radial gradient's spread method: 'pad', 'repeat' or 'reflect'
 */

/**
 * @class SvgOverlay
 * @extends Overlay
 * @classdesc
 * Creates Svg gradient elements
 * @param {number[][]} colors
 * @param {SvgOptions} options
 */
export default class SvgOverlay extends Overlay {
    constructor(colors, options) {
        super(colors, options)
    }

    /**
     * Creates full svg gradient element with color stops
     * @returns {SVGElement}
     */
    get gradient() {
        const gradient = this._gradientElement(this.options.type)
        const stops = this._stops()
        stops.forEach(stop => gradient.appendChild(stop))
        return gradient
    }

    /**
     * Creates svg gradient element
     * @param {string} type - linear or radial
     * @returns {SvgGradientElement}
     * @private
     */
    _gradientElement(type) {
        const gradient = this._svgElement(`${type}Gradient`)
        const attrs = /((id)|([c|f|x|y|r][x|y|1|2]?))/
        Object.entries(this.options)
            .filter(attr => attrs.test(attr[0]))
            .forEach(attr => gradient.setAttribute(attr[0], attr[1]))
        return gradient
    }

    /**
     * Maps colors to stops
     * @returns {SvgElement[]}
     * @private
     */
    _stops() {
        return this.colors.map(
            color => this._createStop(
                color, 
                this.colors.indexOf(color),
                this.colors.length
            )
        )
    }

    /**
     * Creates single stop element
     * @param {number[]} color
     * @param {number} index 
     * @param {number} length
     * @returns {SvgElement}
     * @private
     */
    _createStop(color, index, length) {
        const stop = this._svgElement('stop')
        stop.setAttribute('offset', `${100 * (index / length)}%`)
        stop.setAttribute(
            'stop-color', 
            `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ? color[3] : 1})`
        )
        return stop
    }

    /**
     * Creates chosen Svg element
     * @param {string} type - type of the NS element
     * @returns {SvgElement}
     * @private
     */
    _svgElement(type) {
        return document.createElementNS(
            'http://www.w3.org/2000/svg',
            type
        )
    }
}