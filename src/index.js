import Base from './base/Base'
import CssOverlay from './css/CssOverlay'
import SvgOverlay from './svg/SvgOverlay'

/**
 * @typedef {object} Output
 * @property {number[][]} base
 * @property {string} css
 * @property {SvgElement[]} svg
 */

/**
 * @class GradientMaker
 * @classdesc generates a gradient depending on the options provided
 */
export default class GradientMaker {
    /**
     * Generates gradient depending on the options provided
     * @param {string[]} colors - array of colors as strings in hex or css rgba format
     * @param {object} options
     * @returns {Output|Output[]} - output gradient object/array of output gradient objects
     * @example
     * const maker = new GradientMaker()
     * const gradient = maker.gradient(hexColors, options)
     */
    gradient(colors, options) {
        if (!Array.isArray(options)) {
            return this._getSingleGradient(colors, options)
        }
        return this._getMultipleGradients(colors, options)
    }

    /**
     * Concats css strings from multiple outputs
     * @param {Output[]} - output
     * @param {string} - entry: css or svg
     * @returns {string|SvgDefsElement}
     */
    concat(output, entry) {
        switch (entry) {
        case 'css':
            return this._createMultipleCss(output)
        case 'svg':
            return this._createMultipleSvg(output)
        default:
            return
        }
    }

    /**
     * Returns single gradient object
     * @param {string[]} colors 
     * @param {object} options
     * @returns {Output}
     * @private 
     */
    _getSingleGradient(colors, options) {
        const output = {}
        const base = new Base(colors, options.base)
        output.base = base.base
        if (options.css) {
            const cssOverlay = new CssOverlay(output.base, options.css)
            output.css = cssOverlay.gradient
        }
        if (options.svg) {
            const svgOverlay = new SvgOverlay(output.base, options.svg)
            output.svg = svgOverlay.gradient
        }
        return output
    }

    /**
     * Returns multiple raw and/or css gradient objects
     * @param {string[]} colors 
     * @param {object} options
     * @returns {Output[]}
     * @private 
     */
    _getMultipleGradients(colors, options) {
        const gradients = []
        options.forEach(opt => {
            const index = options.indexOf(opt)
            gradients.push(this._getSingleGradient(colors[index], opt))
        })
        return gradients
    }

    /**
     * Creates multiple css gradient string
     * @param {Output[]} output
     * @returns {string}
     * @private
     */
    _createMultipleCss(output) {
        const g = Object.values(output)
        return g.map(gradient => gradient.css).join(', ')
    }

    /**
     * Creates multiple css gradient string
     * @param {Output[]} output
     * @returns {SvgDefsElement} - svg defs element
     * @private
     */
    _createMultipleSvg(output) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        Object.values(output).forEach(gradient => {
            defs.appendChild(gradient.svg)
        })
        return defs
    }

}