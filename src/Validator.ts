export type OptionsInterpolation = 'linear' | 'bezier'

export type OptionsMode = 'none' | 'lrgb' | 'lch' | 'hsv' | 'lab'

export type BaseOptions = {
    interpolation: OptionsInterpolation,
    samples: number,
    mode: OptionsMode,
    lightnessCorrection: boolean
}

export default class Validator {
    private invalidColorFormatMessage: string
    private invalidConfigMessage: string
    private mixedArrayMessage: string
    private hex: RegExp
    private rgba: RegExp

    constructor() {
        this.hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        this.rgba = /rgba\(([0-9]+,\s)([0-9]+,\s)([0-9]+,\s)([0-9]?\.?[0-9]\))/
        this.invalidColorFormatMessage = `
            Wrong input format. Following string color types are accepted:
            - hex
            - rgba like:
            'rgba(255, 255, 255, 0.25)' or
            'rgba(255, 255, 255, .25)'
        `
        this.mixedArrayMessage = `
            Colors array contains strings of both rgba and hex strings.
            Please provide rgba strings only.
        `
        this.invalidConfigMessage = 'Invalid input object provided'
    }

    public validateColors(colors: string[]) {
        if (this.findInvalidString(colors)) {
            throw new Error(this.invalidColorFormatMessage)
        }
        if (this.isMixedArray(colors)) {
            throw new Error(this.mixedArrayMessage)
        }
    }

    public validateOptions(options: any) {
        const optsType: string = this.getOptionsType(options)
        switch (optsType) {
            case 'base':
                this.validateBaseOptions(options)
                break
            default:
                return
        }
    }

    private getOptionsType(options: any): string {
        if (options.interpolation) {
            return 'base'
        } else if (options.cssGradientType) {
            return 'css'
        }
    }

    private validateBaseOptions(options: BaseOptions) {
        if (
            (
                options.interpolation !== 'linear' &&
                options.interpolation !== 'bezier'
            ) ||
            (
                options.mode !== 'none' &&
                options.mode !== 'lch' &&
                options.mode !== 'lab' &&
                options.mode !== 'lrgb' &&
                options.mode !== 'hsv'
            ) ||
            typeof options.samples !== 'number' ||
            typeof options.lightnessCorrection !== 'boolean'
        ) {
            throw new Error(this.invalidConfigMessage)
        }
    }

    private findInvalidString(colors: string[]): boolean {
        const invalidString: string = colors
            .find(color => !this.hex.test(color) && !this.rgba.test(color))
        return invalidString !== undefined ? true : false
    }

    private isMixedArray(colors: string[]): boolean {
        const hexIndex: number = this.find(colors, 'hex')
        const rgbaIndex: number = this.find(colors, 'rgba')
        return hexIndex > -1 && rgbaIndex > -1 ?
            true : false
    }

    private find(
        colors: string[],
        format: 'hex' | 'rgba'
    ): number {
        return colors
            .findIndex(color => this[format].test(color))
    }
}