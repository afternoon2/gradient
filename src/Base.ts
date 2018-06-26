import * as chroma from 'chroma-js'
import Validator, { IBaseOptions } from './Validator'

export default class Base {
    public colors: string[]
    public config: IBaseOptions

    private validator: Validator

    constructor(
        public input: string[],
        public options: IBaseOptions
    ) {
        this.colors = input
        this.config = options
        this.validator = new Validator()
        this.validator.validateColors(this.colors)
        this.validator.validateOptions(this.options)
    }

    public generate(): number[][] {
        const scale: any = this.createScale()
        const base: any[] = this.createBase(scale)
        return this.normalize(base)
    }

    private createScale() {
        switch (this.config.interpolation) {
            case 'linear':
                return this.linearInterpolationScale()
            case 'bezier':
                return this.bezierInterpolationScale()
            default:
                return
        }
    }

    private createBase(scale: any): string[] {
        const base: string[] = []
        for (let i = 0; i < this.config.samples; i++) {
            base.push(scale(i / this.config.samples))
        }
        return base
    }

    private linearInterpolationScale() {
        if (this.config.mode !== 'none') {
            if (this.config.lightnessCorrection) {
                return chroma
                    .scale(this.colors)
                    .mode(this.config.mode)
                    .correctLightness()
            } else {
                return chroma
                    .scale(this.colors)
                    .mode(this.config.mode)
            }
        } else {
            if (this.config.lightnessCorrection) {
                return chroma
                    .scale(this.colors)
                    .correctLightness()
            } else {
                return chroma
                    .scale(this.colors)
            }
        }
    }

    private bezierInterpolationScale() {
        if (this.config.lightnessCorrection) {
            return chroma
                .bezier(this.colors)
                .scale()
                .correctLightness()
        } else {
            return chroma
                .bezier(this.colors)
        }
    }

    private removeClippedValues(entry: any): any {
        if (typeof entry !== 'boolean') {
            return entry
        }
    }

    private normalize(base: any[]): number[][] {
        return base
            .map(entry => entry._rgb)
            .map(entry => entry.filter(c => this.removeClippedValues(c)))
            .map(entry => entry.map(c => this.roundRgbaValues(c)))
    }

    private roundRgbaValues(val: number): number {
        return Math.round(val * 100) / 100
    }

}