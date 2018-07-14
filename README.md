# gradient.js
## Gradient creation library running in the browser 🖌🌈

Gradient maker is a javascript module that takes your source colors array and configuration object, and returns a gradient suitable for your needs. Just choose a mode from `raw`, `css` or `svg`.

Gradient maker uses `chroma-js` color manipulation library for gradient generation (Copyright (c) 2011-2017, Gregor Aisch).

## Contents
- [gradient.js](#gradientjs)
    - [Gradient creation library running in the browser 🖌🌈](#gradient-creation-library-running-in-the-browser-%F0%9F%96%8C%F0%9F%8C%88)
    - [Contents](#contents)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Parameters](#parameters)
        - [Colors](#colors)
        - [Options](#options)
            - [Base](#base)
            - [Css](#css)
            - [Svg](#svg)
            - [Configuration example](#configuration-example)
    - [Output](#output)
    - [Multiple gradients](#multiple-gradients)
        - [Options object](#options-object)
        - [Concatenation](#concatenation)
    - [Notes about opacity](#notes-about-opacity)

## Installation

1. Via npm
```javascript
npm install --save-dev gradient
```
2. Via browser as a umd module
```html
<script src="https://unpkg.com/gradient@0.1.0.umd.js">
```

## Usage
`Gradient.gradient` function takes 2 parameters: hex or rgba (in css format) string colors array and configuration object.
```javascript
const gradient = new Gradient()

const g = gradient.gradient(colors, options)
```

## Parameters
### Colors
Colors input should be an array of numbers in rgb or rgba format.

```javascript
[
    [0, 222, 31, 0.4],
    [12, 22, 34]
]
```

Please note, that input colors are the source for further creation of probably bigger amount of output colors, so try to insert max. 5 colors as an input for better visual effect.

### Options

Options object consists of one required and two optional entries. 

#### Base
The required one, called `base`, stands for the basic settings of the gradient creation, mandatory for the chroma-js library. Its' interface looks like this:

```typescript
{
    interpolation: 'linear' | 'bezier'
    mode: 'none' | 'lch' | 'lab' | 'rgb' | 'hsv' | 'hsl' | 'hsi' | 'hcl'
    samples: number
    lightnessCorrection: boolean
}
```
`mode` entry is ommited when the interpolation is set to `bezier`.

Usefullness of setting the lightness correction to `true` (combined with the `bezier` interpolation) is [very well described by Gregor Aisch here](https://www.vis4.net/blog/2013/09/mastering-multi-hued-color-scales/).

`samples` stands for the number of the output's colors. The more you set, the nicer gradient you get (but with worse performance of course).

#### Css
Css entry in the configuration object is mandatory if you want to get css gradient string as an output.

```typescript
{
    type: 'linear' | 'radial'
    angle?: number // between 0 and 359
    shape: 'ellipse' | 'circle'
    top?: number
    left?: number
    extent?: 'farthest-side' | 'closest-side' | 'farthest-corner' | 'closest-corner'
}
```
The `angle` is ommited when the `type` is set to `radial`.

The `extent` keyword is ignored if the shape is set to the `circle` and the `type` is set to `linear`.

When you set the `type` to `radial`, you must provide valid `shape` property.

#### Svg

Svg gradients API is much more tricker. Here's the interface for the svg options object

```typescript
{
    type: 'linear' | 'radial',
    id: string
    angle?: number // in 0-359 range, optional for linear gradient
    x1?: number // linear gradient prop
    y1?: number // linear gradient prop
    x2?: number // linear gradient prop
    y2?: number // linear gradient prop
    cx?: number // radial gradient prop
    cy?: number // radial gradient prop
    r?: number // radial gradient prop
    fx?: number // radial gradient prop
    fy?: number // radial gradient prop
    spreadMethod?: 'pad' | 'repeat' | 'reflect' // optional for radial
    gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox'
}
```

#### Configuration example
```javascript
{
    base: {
        interpolation: 'bezier',
        mode: 'none',
        samples: 10,
        lightnessCorrection: true
    },
    css: {
        type: 'radial',
        shape: 'ellipse',
        top: 44,
        left: 30,
        extent: 'farthest-side'
    },
    svg: {
        type: 'radial',
        cx: 0,
        cy: 0,
        r: 45,
        spreadMethod: 'reflect'
    }
}
```

## Output

Output object responds to the options object provided. So the output object for the configuration example from above should look like below:

```typescript
{
    base: number[]
    css: string
    svg: SvgLinearGradient
}
```

## Multiple gradients
### Options object
If you want to get multiple gradients, replace single colors array with array of color arrays, and a config object with array of those.
`css` or `svg` entry missing in one of the options objects will result in not including it to the output gradient. So if you provide:

```javascript
const colors = [
    [
        [0, 22, 33, .2],
        [0, 221, 233, .1]
    ],
    [
        [10, 22, 33, .2],
        [99, 221, 233, .1]
    ]
]
const opts = [
    {
        base: {/* some base options */},
        css: {/* some css options */},
        svg: {/* some svg options */}
    },
    {
        base: {/* some base options */},
        svg: {/* some svg options */}
    }
]
```

It will not result in the css string in the second output object.

### Concatenation
The output object responds to the options object. In case of multiple gradients it will be an array of output objects. If you want to get multiple css gradient strings or multiple svg gradients ready to go, use `concat` method and pass your output and the entry name to it.
```javascript
const multiple = g.concat(outputArray, 'css')
// results in css string
const multiple2 = g.concat(outputArray, 'svg')
// result in svg defs element
```

## Notes about opacity
If you provide colors in rgb format, you will not see the effects of multiplying, because there will be no opacity set. For multiple gradients initial colors should be in rgba format, unless you don't want to handle the transparency. 

You can also set blend mode to get desired visual effect. However - it might be tricky for some beginner users, especially when it comes to svg gradients.

**Important! Blend mode will be needed in case of using `bezier` interpolation, because it ignores opacity values.**