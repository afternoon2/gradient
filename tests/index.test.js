import Gradient from '../src/index'

test(
    'If gradient maker returns multiple gradients output with no errors',
    () => {
        const maker = new Gradient()
        const colors = [
            [[233, 10, 20, 0.23], [33, 120, 20, 0.25]],
            [[13, 4, 20, 0.23], [33, 120, 20, 0.25]]
        ]
        const configs = [
            {
                base: {
                    interpolation: 'linear',
                    mode: 'rgb',
                    samples: 40,
                    lightnessCorrection: false
                },
                css: {
                    type: 'linear',
                    angle: 10
                }
            },
            {
                base: {
                    interpolation: 'bezier',
                    mode: 'none',
                    samples: 40,
                    lightnessCorrection: false
                },
                css: {
                    type: 'radial',
                    top: 10,
                    left: 22,
                    shape: 'ellipse',
                    extentKeyword: 'closest-side'
                }
            }
        ]
        const gradient = maker.gradient(colors, configs)
        expect(typeof gradient).toBe('object')
        expect(Array.isArray(gradient)).toBe(true)
    }
)

test(
    'If gradient maker concats multiple css strings correctly',
    () => {
        const maker = new Gradient()
        const colors = [
            [[233, 10, 20, 0.23], [33, 120, 20, 0.25]],
            [[13, 4, 20, 0.23], [33, 120, 20, 0.25]]
        ]
        const configs = [
            {
                base: {
                    interpolation: 'linear',
                    mode: 'rgb',
                    samples: 40,
                    lightnessCorrection: false
                },
                css: {
                    type: 'linear',
                    angle: 10
                }
            },
            {
                base: {
                    interpolation: 'bezier',
                    mode: 'none',
                    samples: 40,
                    lightnessCorrection: false
                },
                css: {
                    type: 'radial',
                    top: 10,
                    left: 22,
                    shape: 'ellipse',
                    extentKeyword: 'closest-side'
                }
            }
        ]
        const gradients = maker.gradient(colors, configs)
        const multiple = maker.concat(gradients, 'css')
        expect(typeof multiple).toBe('string')
    }
)

test(
    'If gradient maker concats multiple svg gradients correctly',
    () => {
        const maker = new Gradient()
        const colors = [
            [[233, 10, 20, 0.23], [33, 120, 20, 0.25]],
            [[13, 4, 20, 0.23], [33, 120, 20, 0.25]]
        ]
        const configs = [
            {
                base: {
                    interpolation: 'linear',
                    mode: 'rgb',
                    samples: 40,
                    lightnessCorrection: false
                },
                svg: {
                    type: 'linear',
                    id: 'linear-gradient',
                    x1: 0,
                    y1: 0,
                    x2: 100,
                    y2: 100
                }
            },
            {
                base: {
                    interpolation: 'bezier',
                    mode: 'none',
                    samples: 40,
                    lightnessCorrection: false
                },
                svg: {
                    type: 'radial',
                    id: 'radial-gradient',
                    cx: 0,
                    cy: 0,
                    r: 10,
                    fx: 10,
                    fy: 40,
                    spreadMethod: 'pad'
                }
            }
        ]
        const gradients = maker.gradient(colors, configs)
        const multiple = maker.concat(gradients, 'svg')
        expect(multiple instanceof SVGElement).toBe(true)
    }
)