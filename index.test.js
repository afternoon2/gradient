import { Base, Css, Svg } from './index'


test(
    'If base class does not accept mixed typed color arrays',
    () => {
        const fakeColors = [
            [0, 12, 33, 0.4],
            'rgb(20, 34, 40)'
        ]
        const config = {
            interpolation: 'bezier',
            samples: 10,
            lightnessCorrection: true
        }
        const safeExecution = () => {
            const base = new Base()
            base.get(fakeColors, config)
        }
        expect(safeExecution).toThrowError('Mixed color types ')
    }
)


const opts = {
    interpolation: 'linear',
    samples: 10,
    mode: 'none',
    lightnessCorrection: true
}

test(
    'If Base component generates a base of valid length',
    () => {
        const colors = [
            [9, 9, 9, 0.5],
            [255, 255, 240, 1]
        ]
        const base = new Base()
        const baseResult = base.get(colors, opts)
        expect(baseResult.length).toBe(opts.samples)
    }
)

test(
    'If Base component generates a base as an array of arrays of numbers',
    () => {
        const cols = [
            [66, 134, 244, 0.6], [244, 241, 65, 0.10]
        ]
        const base = new Base()
        const baseResult = base.get(cols, opts)
        expect(Array.isArray(baseResult[0])).toBe(true)
        expect(baseResult[0].length).toBe(4)
        expect(typeof baseResult[0][0]).toBe('number')
    }
)

test(
    'If base creation preserves opacity values',
    () => {
        const colors = [
            [9, 9, 9, 0.5],
            [255, 255, 240, 1]
        ]
        const base = new Base()
        const baseResult = base.get(colors, opts)
        const opacityNotPreserved = baseResult
            .findIndex(res => res.length < 4) > -1 ?
            true : false
        expect(opacityNotPreserved).toBe(false)
    }
)


test(
    'If SvgOverlay creates a gradient correctly',
    () => {
        const colors = [
            [1, 224, 128, 0.4],
            [100, 55, 4, 0.1]
        ]
        const options = {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'rgb',
                lightnessCorrection: false
            },
            svg: {
                type: 'linear',
                x1: 0,
                x2: 0,
                y1: 100,
                y2: 100,
                angle: 100,
                gradientUnits: 'userSpaceOnUse'
            }
        }
        const overlay = new Svg()
        expect(overlay.get(colors, options)).toBeInstanceOf(SVGElement)
    }
)


test(
    'If gradient-css generates correct css linear gradient',
    () => {
        const css = new Css()
        const regexp = /linear-gradient\(((rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+)\)/
        const gradient = css.get([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'hsl',
                lightessCorrection: true
            },
            css: {
                type: 'linear'
            }
        })
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct linear gradient with angle',
    () => {
        const css = new Css()
        const regexp = /linear-gradient\(([0-9]+deg\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = css.get([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'hsl',
                lightessCorrection: true
            },
            css: {
                type: 'linear',
                angle: 90
            }
        })
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If gradient-css generates correct css radial gradient with the shape of a circle',
    () => {
        const css = new Css()
        const regexp = /radial-gradient\((circle\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = css.get([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'hsl',
                lightessCorrection: true
            },
            css: {
                type: 'radial',
                shape: 'circle'
            }
        })
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If gradient-css generates correct css radial gradient with the shape of a circle and the position',
    () => {
        const css = new Css()
        const regexp = /radial-gradient\((circle\s?)(at\s([0-9]+%)\s[0-9]+%\,\s)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = css.get([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'hsl',
                lightessCorrection: true
            },
            css: {
                type: 'radial',
                shape: 'circle',
                top: 30,
                left: 20
            }
        })
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If gradient-css generates correct css radial gradient with the shape of a ellipse, the position and the extent keyword',
    () => {
        const css = new Css()
        const regexp = /radial-gradient\(((farthest|closest)-(side|corner)\,?\s?)(at(\s[0-9]+%)+\,?\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = css.get([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'hsl',
                lightessCorrection: true
            },
            css: {
                type: 'radial',
                top: 30,
                left: 20,
                shape: 'ellipse',
                extent: 'farthest-corner'
            }
        })
        expect(regexp.test(gradient)).toBe(true)
    }
)


test(
    'If SvgOverlay creates a raw gradient correctly',
    () => {
        const colors = [
            [1, 224, 128, 0.4],
            [100, 55, 4, 0.1]
        ]
        const options = {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'rgb',
                lightnessCorrection: false
            },
            svg: {
                type: 'linear',
                id: 'gradient-0',
                x1: 0,
                x2: 0,
                y1: 100,
                y2: 100,
                angle: 100,
                gradientUnits: 'userSpaceOnUse'
            }
        }
        const overlay = new Svg()
        expect(overlay.get(colors, options, true)).toBeInstanceOf(Object)
        expect(overlay.get(colors, options, true).stops.length).toBe(options.base.samples)
    }
)