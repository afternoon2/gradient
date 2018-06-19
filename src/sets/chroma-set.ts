export const SAMPLES = 'Samples'
export const INTERPOLATION = 'Interpolation'
export const MODE = 'Mode'
export const LIGHTNESS_CORRECTION = 'Lightness correction'

export const CHROMA_SET = [
    {
        name: SAMPLES,
        type: 'range',
        items: [10, 40, 10, 10]
    },
    {
        name: INTERPOLATION,
        type: 'select',
        items: [
            'linear',
            'bezier'
        ]
    },
    {
        name: MODE,
        type: 'select',
        items: [
            'none',
            'lab',
            'lch',
            'lrgb',
            'hsl'
        ]
    },
    {
        name: LIGHTNESS_CORRECTION,
        type: 'checkbox',
        value: false
    }
]