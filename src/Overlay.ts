import Validator, {
    IBaseOptions,
    ICssOptions
} from './Validator'

export type OverlayOptions = IBaseOptions | ICssOptions

export interface IOverlay {
    input: number[][],
    options: OverlayOptions
}

export default class Overlay implements IOverlay {
    public colors: number[][]
    public config: OverlayOptions
    protected validator: Validator

    constructor(
        public input: number[][],
        public options: OverlayOptions
    ) {
        this.colors = input
        this.config = options
        this.validator = new Validator()
        this.checkConfig()
    }

    protected checkConfig() {
        this.validator.validateOptions(this.config)
    }
}