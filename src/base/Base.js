import chroma from 'chroma-js'
import Validator from '../validator/Validator'

/**
 * @class Base
 * @classdesc provides base array of gradient data
 * @param {string[]} colors - input colors
 * @param {object} options - base configuration object
 * @private
 */
export default class Base {
    constructor(colors, options) {
        this.colors = colors
        this.options = options

        /**
         * @property {Validator} _validator - Valiator class instance 
         */
        this._validator = new Validator()
        this._validator.validateColors(this.colors)
        this._validator.validateOptions(this.options)
    }

    get base() {
        const scale = this._createScale()
        const base = this._createBase(scale)
        return this._normalize(base)
    }

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

    _createBase(scale) {
        const base = []
        for (let i = 0; i < this.options.samples; i++) {
            base.push(scale(i / this.options.samples))
        }
        return base
    }

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

    _removeClippedValues(entry) {
        if (typeof entry !== 'boolean') {
            return entry
        }
    }

    _normalize(base) {
        return base
            .map(entry => entry._rgb)
            .map(entry => entry.filter(c => this._removeClippedValues(c)))
            .map(entry => entry.map(c => this._roundRgbaValues(c)))
    }

    _roundRgbaValues(val) {
        return Math.round(val * 100) / 100
    }
}