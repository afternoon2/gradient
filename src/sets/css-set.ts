export const OPACITY = 'Opacity'
export const CSS_GRADIENT_TYPE = 'Css gradient type'
export const POSITION = 'Position'
export const TOP = 'Top'
export const LEFT = 'Left'
export const SHAPE = 'Shape'
export const EXTENT_KEYWORD = 'Extent keyword'
export const WITH_ANGLE = 'With angle'
export const ANGLE = 'Angle'

export const CSS_SET = [
    {
        name: CSS_GRADIENT_TYPE,
        type: 'select',
        items: [
            'linear',
            'radial'
        ]
    },
    {
        name: POSITION,
        type: 'checkbox',
        value: false
    },
    {
        name: TOP,
        type: 'range',
        items: [1, 100, 50, 1]
    },
    {
        name: LEFT,
        type: 'range',
        items: [1, 100, 50, 1]
    },
    {
        name: SHAPE,
        type: 'select',
        items: [
            'ellipse',
            'circle'
        ]
    },
    {
        name: EXTENT_KEYWORD,
        type: 'select',
        items: [
            'none',
            'closest-side',
            'closest-corner',
            'farthest-side',
            'farthest-corner'
        ]
    },
    {
        name: WITH_ANGLE,
        type: 'checkbox',
        value: false
    },
    {
        name: ANGLE,
        type: 'range',
        items: [1, 360, 180, 1]
    }
]