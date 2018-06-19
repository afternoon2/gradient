export interface IRgb {
    r: number
    g: number
    b: number
}

export interface IInput {
    rgb: IRgb[],
    hex: string[]
}

export default class Input implements IInput {

    private inputs: IInput

    constructor(public colors: IRgb[]) {
        this.inputs = this.check(colors)
    }

    public get allInputs(): IInput {
        return this.inputs
    }

    public get hex(): string[] {
        return this.inputs.hex
    }

    public get rgb(): IRgb[] {
        return this.inputs.rgb
    }

    private check(colors: IRgb[]): IInput {
        return {
            rgb: colors,
            hex: colors.map(color => this.rgbToHex(color))
        }
    }

    private rgbPartToHex(part: number): string {
        const hex: string = part.toString(16)
        return hex.length === 1 ?
            '0' : hex
    }

    private rgbToHex(color: IRgb): string {
        return `#${this.rgbPartToHex(color.r)}${this.rgbPartToHex(color.g)}${this.rgbPartToHex(color.b)}`
    }

    /*private hexToRgb(color: string): IRgb {
        const numeric: number = Number.parseInt(color.substr(1), 16)
        return {
            r: (numeric >> 16) & 0xFF,
            g: (numeric >> 8) & 0xFF,
            b: numeric & 0xFF,
        }
    }*/

}