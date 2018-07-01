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
     * @param {object} options - configuration object
     * @param {string} mode - sets the output mode (raw - array of rgba arrays, css - css
     */
    gradient(colors, options, mode) {
        const _base = new Base(colors, options.base)
        switch (mode) {
        case 'raw':
            return _base.base
        case 'css':
            const _css = new CssOverlay(_base.base, options.css)
            return _css.gradient
        }
    }
}