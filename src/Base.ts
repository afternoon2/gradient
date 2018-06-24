import * as chroma from 'chroma-js'

export type BaseOptions = {
    interpolation: 'linear' | 'bezier',
    samples: number,
    mode: 'none' | 'lrgb' | 'lch' | 'hsv' | 'lab',
    lightnessCorrection: boolean
}

export default class Base {
    private errorMessage: string = `
        Wrong input format. Following string color types are accepted:
        - hex
        - rgba like:
        'rgba(255, 255, 255, 0.25)' or
        'rgba(255, 255, 255, .25)'
    `
    private input: string[]
    private config: BaseOptions
    private hex: RegExp
    private rgba: RegExp

    constructor(
        private colors: string[],
        private options: BaseOptions
    ) {
        this.input = colors
        this.config = options
        this.hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        this.rgba = /rgba\(([0-9]+,\s)([0-9]+,\s)([0-9]+,\s)([0-9]?\.?[0-9]\))/
        this.validateInput()
    }

    public get inputs(): string[] {
        return this.input
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