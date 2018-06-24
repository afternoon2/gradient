import * as chroma from 'chroma-js'

export type OptionsInterpolation = 'linear' | 'bezier'

export type OptionsMode = 'none' | 'lrgb' | 'lch' | 'hsv' | 'lab'

export type ValidatorOptions = {
    interpolation: OptionsInterpolation,
    samples: number,
    mode: OptionsMode,
    lightnessCorrection: boolean
}

export default class Validator {
    private errorMessage: string = `
        Wrong input format. Following string color types are accepted:
        - hex
        - rgba like:
        'rgba(255, 255, 255, 0.25)' or
        'rgba(255, 255, 255, .25)'
    `
    private input: string[]
    private config: ValidatorOptions
    private hex: RegExp
    private rgba: RegExp

    constructor(
        private colors: string[],
        private options: ValidatorOptions
    ) {
        this.input = colors
        this.config = options
        this.hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        this.rgba = /rgba\(([0-9]+,\s)([0-9]+,\s)([0-9]+,\s)([0-9]?\.?[0-9]\))/
        this.validateInput()
        this.validateOptions()
    }

    public get inputs(): string[] {
        return this.input
    }

    public get configuration(): ValidatorOptions {
        return this.config
    }

    private validateOptions() {
        if (
            (
                (<ValidatorOptions> this.config).interpolation !== 'linear' &&
                (<ValidatorOptions> this.config).interpolation !== 'bezier'
            ) ||
            (
                (<ValidatorOptions> this.config).mode !== 'none' &&
                (<ValidatorOptions> this.config).mode !== 'lch' &&
                (<ValidatorOptions> this.config).mode !== 'lab' &&
                (<ValidatorOptions> this.config).mode !== 'lrgb' &&
                (<ValidatorOptions> this.config).mode !== 'hsv'
            ) ||
            typeof this.config.samples !== 'number' ||
            typeof this.config.lightnessCorrection !== 'boolean'
        ) {
            throw new Error('Invalid input object provided')
        }
        if (
            this.config.interpolation === 'bezier' &&
            this.config.mode !== 'none'
        ) {
            this.config.mode = 'none'
        }
    }

    private validateInput() {
        if (this.findInvalidString()) {
            throw new Error(this.errorMessage)
        }
        this.checkIfHex()
    }

    private findInvalidString(): boolean {
        const invalidString: string = this.input
            .find(color => !this.hex.test(color) && !this.rgba.test(color))
        return invalidString !== undefined ? true : false
    }

    private checkIfHex() {
        const hexIndexes: number[] = this.findHexStrings()
        if (hexIndexes.length > 0) {
            hexIndexes.forEach(index => {
                this.input[index] = this.hexToRgba(this.input[index])
            })
        }
    }

    private findHexStrings(): number[] {
        const indexes: number[] = []
        this.input.forEach(color => {
            if (this.hex.test(color)) {
                indexes.push(this.input.indexOf(color))
            }
        })
        return indexes
    }

    private hexToRgba(color: string): string {
        const colorArr: number[] = chroma(color).rgba()
        return `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3]})`
    }
}