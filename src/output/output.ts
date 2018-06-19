import {
    INTERPOLATION,
    MODE,
    LIGHTNESS_CORRECTION,
    SAMPLES
} from '../rules/chroma';
import chroma from 'chroma-js'

export default class Output {

    private configuration: any
    private input: string[]

    constructor(
        private config: any,
        private colors: string[]
    ) {
        this.configuration = config
        this.input = colors
    }

    public get gradient() {
        const scale = this.createScale()
        const base = this.createBase(scale)
        return this.stringifyResults(base)
    }

    private getVal(prop: string): any {
        return this.configuration[prop].value
    }

    private linearModeSwitch(mode: string, lightnessCorrection: boolean, scale: any) {
        if (mode !== 'none') {
            if (lightnessCorrection) {
                scale = chroma
                    .scale(this.input)
                    .mode(mode)
                    .correctLightness()
            } else {
                scale = chroma
                    .scale(this.input)
                    .mode(mode)
            }
        } else {
            if (lightnessCorrection) {
                scale = chroma
                    .scale(this.input)
                    .correctLightness()
            } else {
                scale = chroma
                    .scale(this.input)
            }
        }
    }

    private bezierModeSwitch(lightnessCorrection: boolean, scale: any) {
        if (lightnessCorrection) {
            scale = chroma
                .bezier(this.input)
                .scale()
                .correctLightness()
        } else {
            scale = chroma
                .bezier(this.input)
        }
    }

    private createScale(): any {
        const mode: string = this.getVal(MODE)
        const lightnessCorrection: boolean = this.getVal(LIGHTNESS_CORRECTION)
        let scale: any = ''
        switch (this.getVal(INTERPOLATION)) {
            case 'linear':
                this.linearModeSwitch(mode, lightnessCorrection, scale)
                break
            case 'bezier':
                this.bezierModeSwitch(lightnessCorrection, scale)
                break
            default:
                scale = undefined
        }
        return scale
    }

    private createBase(scale: any): any[] {
        const samples = this.getVal(SAMPLES)
        const base = []
        for (let i = 0; i < samples; i++) {
            base.push(scale(i / samples))
        }
        return base
    }

    private stringifyResults(base: any[]): string[] {
        return base.map(color => {
            const r = Math.floor(color._rgb[0])
            const g = Math.floor(color._rgb[1])
            const b = Math.floor(color._rgb[2])
            return `rgb(${r}, ${g}, ${b})`
        })
    }
}