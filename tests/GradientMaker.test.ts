import GradientMaker from '../src/index'

test(
    'If gradient maker generates correct raw gradient without any errors',
    () => {
        const input = ['#fc0012', '#12d400']
        const config = {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'none',
                lightnessCorrection: false
            }
        }
        const gm = new GradientMaker(input, config, 'raw')
        expect(gm.gradient.length).toBe(10)
        expect(Array.isArray(gm.gradient[0])).toBe(true)
    }
)

test(
    'If gradient maker generates correct css gradient without any errors',
    () => {
        const input = ['#ffcc00', '#12d400']
        const config = {
            base: {
                interpolation: 'linear',
                samples: 10,
                mode: 'none',
                lightnessCorrection: false
            },
            css: {
                type: 'radial',
                top: 90,
                left: 14,
                shape: 'circle'
            }
        }
        const gm = new GradientMaker(input, config, 'css')
        expect(/undefined/.test(gm.gradient)).toBe(false)
    }
)