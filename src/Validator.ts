import messages from './messages'

export type OptionsInterpolation = 'linear' | 'bezier'
export type OptionsMode = 'lch' | 'hsv' | 'lab' | 'rgb' | 'hsl' | 'hsi' | 'hcl'  | 'none'

export interface IBaseOptions {
    interpolation: OptionsInterpolation
    samples: number
    mode: OptionsMode
    lightnessCorrection: boolean
}

export type CssGradientType = 'linear' | 'radial'
export type CssRadialGradientShape = 'ellipse' | 'circle'
export type CssRadialGradientExtent = 'none' | 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner'

export interface ICssLinearGradientOptions {
    withAngle: boolean
    angle?: number
}

export interface ICssRadialGradientOptions {
    position?: boolean
    top?: number
    left?: number
    shape?: CssRadialGradientShape
    extentKeyword?: CssRadialGradientExtent
}

export interface ICssOptions {
    gradientType: 'linear' | 'radial',
    meta: ICssLinearGradientOptions | ICssRadialGradientOptions
}

export default class Validator {
    private hex: RegExp
    private rgba: RegExp

    constructor() {
        this.hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        this.rgba = /rgba\(([0-9]+,\s)([0-9]+,\s)([0-9]+,\s)([0-9]?\.?[0-9]\))/
    }

    public validateColors(colors: string[]) {
        if (this.findInvalidString(colors)) {
            throw new Error(messages.base.invalidColorFormat)
        }
        if (this.isMixedArray(colors)) {
            throw new Error(messages.base.mixedArray)
        }
    }

    public validateOptions(options: any) {
        const optsType: string = this.getOptionsType(options)
        switch (optsType) {
            case 'base':
                this.validateBaseOptions(options)
                break
            case 'css':
                this.validateCssOptions(options)
            default:
                return
        }
    }

    private getOptionsType(options: any): string {
        if (options.interpolation) {
            return 'base'
        } else if (options.gradientType) {
            return 'css'
        }
    }

    // base options
    private validateBaseOptions(options: IBaseOptions) {
        if (
            (
                options.interpolation !== 'linear' &&
                options.interpolation !== 'bezier'
            ) ||
            (
                options.mode !== 'none' &&
                options.mode !== 'lch' &&
                options.mode !== 'lab' &&
                options.mode !== 'rgb' &&
                options.mode !== 'hsv' &&
                options.mode !== 'hsl' &&
                options.mode !== 'hsi' &&
                options.mode !== 'hcl'
            ) ||
            typeof options.samples !== 'number' ||
            typeof options.lightnessCorrection !== 'boolean'
        ) {
            throw new Error(messages.base.invalidConfig)
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

    // css options
    private validateCssOptions(options: ICssOptions) {
        switch (options.gradientType) {
            case 'linear':
                this.validateLinearGradientOptions(options.meta)
                break
            case 'radial':
                this.validateRadialGradientOptions(options.meta)
                break
            default:
                throw new Error(messages.css.noGradientType)
        }
    }

    private validateLinearGradientOptions(meta: ICssLinearGradientOptions) {
        if (!meta.hasOwnProperty('withAngle')) {
            throw new Error(messages.css.noWithAngle)
        }
        if (!meta.withAngle && typeof meta.angle === 'number') {
            console.warn(messages.css.angleIgnored)
        }
        if (meta.withAngle && typeof meta.angle !== 'number') {
            throw new Error(messages.css.noAngle)
        }
    }

    private validateRadialGradientOptions(meta: ICssRadialGradientOptions) {
        if (
           !meta.hasOwnProperty('position') &&
           typeof meta.top === 'number' &&
           typeof meta.left === 'number'
        ) {
           console.warn(messages.css.topLeftWithNoPosition)
        } else if (
            typeof meta.position !== 'boolean' &&
            typeof meta.top === 'number' &&
            typeof meta.left === 'number'
        ) {
            throw new Error(messages.css.invalidPositionType)
        } else if (
            typeof meta.position === 'boolean' &&
            (
                !meta.position.top ||
                !meta.position.left
            )
        ) {
            throw new Error(messages.css.missingTopOrLeftProperty)
        }
    }
}