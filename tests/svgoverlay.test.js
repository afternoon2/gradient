import SvgOverlay from '../src/svg/SvgOverlay'

test(
    'If SvgOverlay creates a gradient correctly',
    () => {
        const colors = [
            [1, 224, 128, 0.4],
            [100, 55, 4, 0.1]
        ]
        const options = {
            type: 'linear',
            x1: 0,
            x2: 0,
            y1: 100,
            y2: 100
        }
        const overlay = new SvgOverlay(colors, options)
        expect(overlay.gradient).toBeInstanceOf(SVGElement)
    }
)

