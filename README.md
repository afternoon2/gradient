# Gradient Maker
## Gradient creation library running in the browser

Gradient maker is a javascript module that takes your source colors array and configuration object, and returns a gradient suitable for your needs. Just choose a mode from `raw`, `css` or `svg`.

Gradient maker uses `chroma-js` color manipulation library for gradient generation (Copyright (c) 2011-2017, Gregor Aisch).

## Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Parameters](#Parameters)
    - [Colors array](#Colors)
    - [Options](#Options)
        - [Base](#Base)
        - [Css](#Css)
        - [Svg](#Svg)

## Installation

1. Via npm
```javascript
npm install --save-dev gradient-maker
```
2. Via browser as a umd module
```html
<script src="https://unpkg.com/gradient-maker@0.1.0.umd.js">
```

## Usage
`GradientMaker.gradient` function takes 2 parameters: hex or rgba (in css format) string colors array and configuration object.
```javascript
const gradientMaker = new GradientMaker()

const gradient = gradientMaker.gradient(colors, options)
```

## Parameters
### Colors
Colors input should be an array of strings in hexadecimal or css rgba format. No mixed type arrays are accepted.

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
    extent?: 'farthest-side' | 'closest-side' | 'farthest-corner' | 'farthest-side'
}
```
The `angle` is ommited when the `type` is set to `radial`.

The `extent` keyword is ignored if the shape is set to the `circle` and the `type` is set to `linear`.

When you set the `type` to `radial`, you must provide valid `shape` property.

#### Svg

Svg gradients API is much more tricker than css. Here's the interface for the svg options object

```typescript
{
    type: 'linear' | 'radial',
    id: string
    angle: number // in 0-359 range, TBD
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    cx?: number
    cy?: number
    r?: number
    fx?: number
    fy?: number
    spreadMethod?: 'pad' | 'repeat' | 'reflect'
}
```

### Configuration example
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
        angle: number,
        shape: 'ellipse',
        top: 44,
        left: 30,
        extent: 'farthest-side'
    }
}
```

### Multiple gradients
If you want to get multiple gradients, replace single colors array with array of color arrays, and a config object with array of those.

### Note about opacity
Remember that if you provide colors in hexadecimal format, you will not see the effects of multiplying, because there will be no opacity set. For multiple gradients initial strings should be in rgba format, unless you don't want to handle the transparency. You can also set blend mode to get desired visual effect.