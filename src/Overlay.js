import Validator from './Validator'

/**
 * @class Overlay
 * @classdesc Foundational overlay class
 * @param {number[][]} colors - converted colors array
 * @param {object} options - options object specific for the overlay
 * @private
 */
export default class Overlay {
    constructor(colors, options) {
        this.colors = colors
        this.options = options

        /**
         * Validator class instance
         * @private
         */
        this._validator = new Validator()
        this._checkOptions()
    }

    /**
     * Validates provided options
     * @private
     */
    _checkOptions() {
        this._validator.validateOptions(this.options)
    }
}