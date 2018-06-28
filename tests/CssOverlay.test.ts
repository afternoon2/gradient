/* tslint:disable */
import CssOverlay from '../src/CssOverlay'

let overlay: CssOverlay

const linearGradientExp: RegExp = /linear-gradient\(([0-9]+deg)?\,?\s?rgba\([0-9]+\,\s?[0-9]+\,\s?[0-9]+\,\s?[0-9]?\.?([0-9]+)?\),\s?rgba\([0-9]+\,\s?[0-9]+\,\s?[0-9]+\,\s?[0-9]?\.?([0-9]+)?\)\)/

test(
    'If css overlay returns gradient string',
    () => {
        const config = {
            gradientType: 'linear',
            meta: {
                withAngle: true,
                angle: 20
            }
        }
        const input: number[][] = [
            [120, 30, 44, 1],
            [45, 210, 22, 1]
        ]
        overlay = new CssOverlay(input, config)
        const gradient = overlay.createGradient()
        expect(typeof gradient).toBe('string')
    }
)

test(
    'If css overlay returns correct linear gradient',
    () => {
        const input: number[][] = [
            [120, 30, 44, 1],
            [45, 210, 22, 1]
        ]
        const config = {
            gradientType: 'linear',
            meta: {
                withAngle: false
            }
        }
        overlay = new CssOverlay(input, config)
        const gradient = overlay.createGradient()
        expect(linearGradientExp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct linear gradient with angle',
    () => {
        const input: number[][] = [
            [120, 30, 44, 1],
            [45, 210, 22, 1]
        ]
        const config = {
            gradientType: 'linear',
            meta: {
                withAngle: true,
                angle: 49
            }
        }
        overlay = new CssOverlay(input, config)
        const gradient = overlay.createGradient()
        console.log(gradient)
        expect(linearGradientExp.test(gradient)).toBe(true)
    }
)