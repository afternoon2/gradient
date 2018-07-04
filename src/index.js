import Base from './base/Base'
import CssOverlay from './css/CssOverlay'

/**
 * @class GradientMaker
 * @classdesc generates a gradient depending on the options provided
 */
export default class GradientMaker {
    /**
     * Generates gradient depending on the options provided
     * @param {string[]} colors - array of colors as strings in hex or css rgba format
     * @param {object} options
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

    _getSingleGradient(colors, options) {
        const _base = new Base(colors, options.base)
        if (
            options.base &&
            !options.css
        ) {
            return _base.base
        } else if (
            options.base &&
            options.css
        ) {
            const _css = new CssOverlay(_base.base, options.css)
            return _css.gradient
        }
    }

    _getMultipleGradients(colors, options) {
        const gradients = []
        options.forEach(opt => {
            const i = options.indexOf(opt)
            const gradient = this._getSingleGradient(colors[i], opt)
            gradients.push(gradient)
        })
        return gradients.join(', ')
    }
}