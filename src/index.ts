import Base from './base/Base'
import CssOverlay from './css/CssOverlay'
import {
    IBaseOptions,
    ICssOptions
} from './Validator'

export type GradientMakerMode = 'raw' | 'css'

export interface IGradientMakerSettings {
    base: IBaseOptions,
    css?: ICssOptions
}

export interface IGradientMaker {
    input: string[],
    settings: IGradientMakerSettings,
    mode: GradientMakerMode
}

export default class GradientMaker implements IGradientMaker {

    public colors: string[]
    public configurations: IGradientMakerSettings
    public output: GradientMakerMode

    private base: Base
    private cssOverlay?: CssOverlay

    constructor(
        public input: string[],
        public settings: IGradientMakerSettings,
        public mode: GradientMakerMode
    ) {
        this.colors = input
        this.configurations = settings
        this.output  = mode
        this.base = new Base(this.colors, this.configurations.base)
        if (this.output === 'css') {
            this.cssOverlay = new CssOverlay(this.base.generate(), this.configurations.css)
        }
    }

    public get gradient(): any {
        switch (this.output) {
            case 'raw':
                return this.base.generate()
            case 'css':
                return this.cssOverlay.gradient
        }
    }
}