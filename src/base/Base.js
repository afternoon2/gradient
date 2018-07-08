import chroma from 'chroma-js'
import Validator from '../Validator'

/**
 * @typedef {object} BaseOptions - Base component's configuration object
 * @property {string} interpolation - 'linear' or 'bezier'
 * @property {string} mode - 'none', 'lch', 'lab', 'rgb', 'hsv', 'hsl', 'hsi', or 'hcl'
 * @property {number} samples - number of output colors
 * @property {boolean} lightnessCorrection - lightness correction applier
 */

/**
 * @class Base
 * @classdesc provides base array of gradient data
 * @param {string[]} colors - input colors
 * @param {BaseOptions} options - base configuration object
 */
export default class Base {
    constructor(colors, options) {
        this.colors = colors
        this.options = options

        /**
         * @property {Validator} _validator - Valiator class instance 
         */
        this._validator = new Validator()
        this._validator._validateColors(this.colors)
        this._validator._validateOptions(this.options)
    }

    /**
     * @returns {number[][]}
     * @description
     * It returns an array of arrays of normalized rgba values
     * @protected
     */
    get base() {
        const scale = this._createScale()
        const base = this._createBase(scale)
        return this._normalize(base)
    }

    /**
     * @returns {void}
     * Returns chroma.js scale
     * @private 
     */
    _createScale() {
        switch (this.options.interpolation) {
        case 'linear':
            return this._linearInterpolationScale()
        case 'bezier':
            return this._bezierInterpolationScale()
        default:
            return
        }
    }

    /**
     * @returns {any[]}
     * @param {void} scale - chroma.js scale
     * @private 
     */
    _createBase(scale) {
        const base = []
        for (let i = 0; i < this.options.samples; i++) {
            base.push(scale(i / this.options.samples))
        }
        return base
    }

    /**
     * @returns {void} - linear interpolation chroma.js scale
     * @private
     */
    _linearInterpolationScale() {
        if (this.options.mode !== 'none') {
            if (this.options.lightnessCorrection) {
                return chroma
                    .scale(this.colors)
                    .mode(this.options.mode)
                    .correctLightness()
            } else {
                return chroma
                    .scale(this.colors)
                    .mode(this.options.mode)
            }
        } else {
            if (this.options.lightnessCorrection) {
                return chroma
                    .scale(this.colors)
                    .correctLightness()
            } else {
                return chroma
                    .scale(this.colors)
            }
        }
    }

    /**
     * @returns {void} - bezier interpolation chroma.js scale
     * @private
     */
    _bezierInterpolationScale() {
        if (this.options.lightnessCorrection) {
            return chroma
                .bezier(this.colors)
                .scale()
                .correctLightness()
        } else {
            return chroma
                .bezier(this.colors)
        }
    }

    /**
     * 
     * @param {any} entry
     * Helps with filtering out the clipped boolean values from the chroma base object
     * @private
     */
    _removeClippedValues(entry) {
        if (typeof entry !== 'boolean') {
            return entry
        }
    }

    /**
     * @return {number[]}
     * @param {any} base
     * Removes clipped values and rounds the rgba values up to to the second position 
     * @private
     */
    _normalize(base) {
        return base
            .map(entry => entry._rgb)
            .map(entry => entry.filter(c => this._removeClippedValues(c)))
            .map(entry => entry.map(c => this._roundRgbaValues(c)))
    }

    /**
     * @returns {number}
     * @param {number} val 
     * Rounds the rgba values up to to the second position
     * @private
     */
    _roundRgbaValues(val) {
        return Math.round(val * 100) / 100
    }
}