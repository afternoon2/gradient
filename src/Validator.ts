import baseMessages from './base/messages'
import cssMessages from './css/messages'

export type OptionsInterpolation = 'linear' | 'bezier'
export type OptionsMode = 'lch' | 'hsv' | 'lab' | 'rgb' | 'hsl' | 'hsi' | 'hcl'  | 'none'

export interface IBaseOptions {
    interpolation: OptionsInterpolation
    samples: number
    mode: OptionsMode
    lightnessCorrection: boolean
}

export type Csstype = 'linear' | 'radial'
export type CssRadialGradientShape = 'ellipse' | 'circle'
export type CssRadialGradientExtent = 'none' | 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner'

export interface ICssOptions {
    type: 'linear' | 'radial'
    angle?: number
    top?: number
    left?: number
    shape?: CssRadialGradientShape
    extent?: CssRadialGradientExtent
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
            throw new Error(baseMessages.invalidColorFormat)
        }
        if (this.isMixedArray(colors)) {
            throw new Error(baseMessages.mixedArray)
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
        } else if (options.type) {
            return 'css'
        } else {
            throw new Error('Invalid options provided')
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
            throw new Error(baseMessages.invalidConfig)
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
}