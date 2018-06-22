import * as chroma from 'chroma-js'
import { Scale, Color } from 'chroma-js'

export interface IBaseOptions {
    samples: number
    interpolation: 'linear' | 'bezier'
    mode: 'none' | 'lrgb' | 'lch' | 'hsv' | 'lab'
    lightnessCorrection: boolean
}

export interface IRGBA {
    r: number
    g: number
    b: number
    a: number
}

export type IColor = IRGBA | string

export class Base {

    private colors: IColor[]
    private config: IBaseOptions

    constructor(
        private input: IColor[],
        private opts: IBaseOptions
    ) {
        this.colors = this._check(input)
        this.config = this._validate(opts)
    }

    public generate() {
        const scale = this._createScale()
        const base = this._createBase(scale)
        return this._normalize(base)
    }

    private _removeClippedValues(entry: any) {
        if (typeof entry !== 'boolean') {
            return entry
        }
    }

    private _roundRgbaValues(val: number): number {
        return Math.round(val * 100) / 100
    }

    private _normalize(base: any): number[] {
        return base
            .map(entry => entry._rgb)
            .map(entry => entry.filter(c => this._removeClippedValues(c)))
            .map(entry => entry.map(c => this._roundRgbaValues(c)))
    }

    private _hexToRgba(color: string): number[] {
        return chroma(color).rgba()
    }

    private _check(colors: IColor[]): IColor[] {
        const hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        if (
            typeof colors[0] === 'string' &&
            hex.test(colors[0])
        ) {
            return colors.map(color => this._hexToRgba(color))
        }
        return colors
    }

    private _validate(opts: IBaseOptions): IBaseOptions {
        if (opts.interpolation === 'bezier') {
            opts.mode = 'none'
        }
        return opts
    }

    private _linearInterpolationScale(
        mode: string,
        lightnessCorrection: boolean
    ): Scale {
        if (mode !== 'none') {
            if (lightnessCorrection) {
                return chroma
                    .scale(this.colors)
                    .mode(mode)
                    .correctLightness()
            } else {
                return chroma
                    .scale(this.colors)
                    .mode(mode)
            }
        } else {
            if (lightnessCorrection) {
                return chroma
                    .scale(this.colors)
                    .correctLightness()
            } else {
                return chroma
                    .scale(this.colors)
            }
        }
    }

    private _bezierInterpolationScale(lightnessCorrection: boolean): Scale {
        if (lightnessCorrection) {
            return chroma
                .bezier(this.colors)
                .scale()
                .correctLightness()
        } else {
            return chroma
                .bezier(this.colors)
        }
    }

    private _createScale(): Scale {
        const mode: string = this.config.mode
        const lightnessCorrection: boolean = this.config.lightnessCorrection
        let scale: Scale
        switch (this.config.interpolation) {
            case 'linear':
                scale = this._linearInterpolationScale(mode, lightnessCorrection)
                break
            case 'bezier':
                scale = this._bezierInterpolationScale(lightnessCorrection)
                break
            default:
                return
        }
        return scale
    }

    private _createBase(scale: any): Color[] {
        const samples = this.config.samples
        const base = []
        for (let i = 0; i < samples; i++) {
            base.push(scale(i / samples))
        }
        return base
    }
}
