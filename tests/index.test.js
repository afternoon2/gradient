import GradientMaker from '../src/index'

test(
    'If gradient maker returns multiple css gradient string with no errors',
    () => {
        const maker = new GradientMaker()
        const colors = [
            ['rgba(233, 10, 20, 0.23)', 'rgba(33, 120, 20, 0.25)'],
            ['rgba(13, 4, 20, 0.23)', 'rgba(33, 120, 20, 0.25)']
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
        expect(typeof gradient).toBe('string')
    }
)