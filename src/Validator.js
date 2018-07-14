import baseMessages from './base/messages'
import cssMessages from './css/messages'
import svgMessages from './svg/messages'

/**
 * @class Validator
 * @classdesc Validation module
 * @private
 */
export default class Validator {
    constructor() {
        /**
         * @typedef {stringlike} RegExp - regular expression type
         */

        /**
         * @property {RegExp} _hex
         * Regular expression for hex colors validation
         * @private
         */
        this._hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/

        /**
         * @property {RegExp} _rgba
         * Regular expression for hex colors validation
         * @private
         */
        this._rgba = /(rgba\()(([0-9]+\,\s?)+([0-9]?\.?[0-9]+)\))/

        /**
         * @property {string[]} _modes
         * Modes for the base generation
         * @private
         */
        this._modes = [
            'none',
            'lch',
            'lab',
            'rgb',
            'hsv',
            'hsl',
            'hsi',
            'hcl'
        ]
    }

    /**
     * Makes colors array validation
     * @param {string[]} colors - colors array 
     * @private
     */
    _validateColors(colors) {
        if (this._findInvalidColors(colors)) {
            throw new Error(baseMessages.invalidColorFormat)
        }
    }


    /**
     * Makes options (configration) object validation, regardless the mode
     * @param {CssOptions|BaseOptions|SvgOptions} options - options object to validate
     * @private
     */
    _validateOptions(options) {
        const optsType = this._getOptionsType(options)
        switch (optsType) {
        case 'base':
            this._validateBaseOptions(options)
            break
        case 'css':
            this._validateCssOptions(options)
            break
        case 'svg':
            this._validateSvgOptions(options)
            break
        }
    }

    /**
     * Returns type of the provided options
     * @returns {string}
     * @param {object} options - options to check
     * @private
     */
    _getOptionsType(options) {
        if (options.interpolation) {
            return 'base'
        } else if (options.type && !options.id) {
            return 'css'
        } else if (options.type && options.id) {
            return 'svg'
        } else {
            throw new Error('Invalid options provided')
        }
    }

    /**
     * Makes base options validation
     * @param {object} options - options to validate
     * @private
     */
    _validateBaseOptions(options) {
        if (
            (
                options.interpolation !== 'linear' &&
                options.interpolation !== 'bezier'
            ) ||
            this._modes.findIndex(mode => mode === options.mode) === -1 ||
            typeof options.samples !== 'number' ||
            typeof options.lightnessCorrection !== 'boolean'
        ) {
            throw new Error(baseMessages.invalidConfig)
        }
    }

    /**
     * It checks colors array for invalid ones
     * @param {number[][]} colors
     * @returns {boolean}
     * @private
     */
    _findInvalidColors(colors) {
        const invalidColor = colors
            .find(color => !Array.isArray(color) || 
                color.length > 4 || 
                color.length < 3 || 
                color.find(c => typeof c !== 'number'
                )
            )
        return invalidColor !== undefined ? true : false
    }

    /**
     * It checks if the colors array contains both hex and rba strings
     * @param {array} colors - color strings array
     * @returns {boolean}
     * @private
     */
    _isMixedArray(colors) {
        const hexIndex = this._find(colors, 'hex')
        const rgbaIndex = this._find(colors, 'rgba')
        return hexIndex > -1 && rgbaIndex > -1 ?
            true : false
    }

    /**
     * Returns index of the color string with specific format
     * @param {string[]} colors - colors array to check
     * @param {string} format - rgba or hex format
     * @private
     * @returns {number}
     */
    _find(colors, format) {
        return colors
            .findIndex(color => this[`_${format}`].test(color))
    }

    /**
     * Makes css options validation
     * @param {object} options - options to validate
     * @private
     */
    _validateCssOptions(options) {
        if (
            options.type === 'radial' &&
            !options.shape
        ) {
            throw new Error(cssMessages.noShape)
        }

        if (
            options.top &&
            options.left &&
            (typeof options.top !== 'number' || typeof options.left !== 'number') ||
            (options.top < 0 || options.top > 100) ||
            (options.left < 0 || options.left > 100)
        ) {
            throw new Error(cssMessages.invalidTopLeft)
        }

        if (
            options.angle &&
            typeof options.angle !== 'number' ||
            (options.angle < 0 || options.angle > 359)
        ) {
            throw new Error(cssMessages.invalidAngle)
        }
    }

    /**
     * Makes svg options validation
     * @param {SvgOptions} options - options to validate
     * @private
     */
    _validateSvgOptions(options) {
        if (
            !options.type ||
            typeof options.type !== 'string' ||
            (
                options.type !== 'linear' &&
                options.type !== 'radial'
            )
        ) {
            throw new Error(svgMessages.invalidGradientType)
        }

        if (
            !options.id ||
            typeof options.id !== 'string'
        ) {
            throw new Error(svgMessages.invalidIdentifier)
        }
        if (
            options.type === 'linear' &&
            (
                (
                    options.x1 &&
                    options.y1 &&
                    options.x2 &&
                    options.y2
                ) &&
                (
                    typeof options.x1 !== 'number' ||
                    typeof options.y1 !== 'number' ||
                    typeof options.x2 !== 'number' ||
                    typeof options.y2 !== 'number'
                )
            )
        ) {
            throw new Error(svgMessages.missingLinearCoordinates)
        }

        if (
            options.type === 'radial' &&
            options.spreadMethod &&
            (
                (
                    options.spreadMethod !== 'pad' &&
                    options.spreadMethod !== 'repeat' &&
                    options.spreadMethod !== 'reflect'
                ) ||
                typeof options.spreadMethod !== 'string'
            )
        ) {
            throw new Error(svgMessages.invalidSpreadMethod)
        }

        if (
            options.type === 'radial' &&
            options.fx &&
            options.fy &&
            (
                typeof options.fx !== 'number' ||
                typeof options.fy !== 'number'
            )
        ) {
            throw new Error(svgMessages.invalidFocalPoint)
        }

        if (
            options.type === 'radial' &&
            (
                (
                    options.cx ||
                    options.cy ||
                    options.r 
                ) &&
                (
                    typeof options.cx !== 'number' ||
                    typeof options.cy !== 'number' ||
                    typeof options.r !== 'number'
                )
            )
        ) {
            throw new Error(svgMessages.missingRadialCoordinates)
        }

        if (
            options.gradientUnits &&
            (
                options.gradientUnits !== 'objectBoundingBox' &&
                options.gradientUnits !== 'userSpaceOnUse'
            )
        ) {
            throw new Error(svgMessages.invalidGradientUnits)
        }

        if (
            options.angle &&
            (
                typeof options.angle !== 'number' ||
                options.angle < 0 ||
                options.angle > 359
            ) 
        ) {
            throw new Error(svgMessages.invalidAngle)
        }
    }
}