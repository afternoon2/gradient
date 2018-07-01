/* tslint:disable */
import CssOverlay from '../src/css/CssOverlay'

let overlay: CssOverlay

const linearGradientExp: RegExp = /linear-gradient\(([0-9]+deg)?\,?\s?rgba\([0-9]+\,\s?[0-9]+\,\s?[0-9]+\,\s?[0-9]?\.?([0-9]+)?\),\s?rgba\([0-9]+\,\s?[0-9]+\,\s?[0-9]+\,\s?[0-9]?\.?([0-9]+)?\)\)/

test(
    'If css overlay returns correct linear gradient with no angle',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'linear'
        })
        const regexp = /linear-gradient\(((rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+)\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct linear gradient with angle',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'linear',
            angle: 90
        })
        const regexp: RegExp = /linear-gradient\(([0-9]+deg\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct radial gradient with ellipse shape, no position and no extent',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'radial',
            shape: 'ellipse'
        })
        const regexp: RegExp = /radial-gradient\((rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct radial gradient with circle shape and no position',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'radial',
            shape: 'circle'
        })
        const regexp: RegExp = /radial-gradient\((circle\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct radial gradient with circle shape and position',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'radial',
            shape: 'circle',
            top: 20,
            left: 60
        })
        const regexp: RegExp = /radial-gradient\((circle\s?)(at\s([0-9]+%)\s[0-9]+%\,\s)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct radial gradient with ellipse shape and extent keyword',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'radial',
            shape: 'ellipse',
            extent: 'farthest-corner'
        })
        const regexp: RegExp = /radial-gradient\(((farthest|closest)-(side|corner)\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct radial gradient with ellipse shape, position and extent keyword',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'radial',
            top: 30,
            left: 20,
            shape: 'ellipse',
            extent: 'farthest-corner'
        })
        const regexp: RegExp = /radial-gradient\(((farthest|closest)-(side|corner)\,?\s?)(at(\s[0-9]+%)+\,?\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        expect(regexp.test(gradient)).toBe(true)
    }
)

test(
    'If css overlay returns correct radial gradient with ellipse shape and position',
    () => {
        overlay = new CssOverlay([
            [10, 220, 33, 0.1],
            [254, 200, 10, 1]
        ], {
            type: 'radial',
            top: 30,
            left: 20,
            shape: 'ellipse'
        })
        const regexp: RegExp = /radial-gradient\((\s?at(\s[0-9]+%)+\,?\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
        const gradient = overlay.gradient
        console.log(gradient)
        expect(regexp.test(gradient)).toBe(true)
    }
)
