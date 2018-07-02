# Gradient Maker
### No UI gradient maker that runs in the browser

Gradient maker is a javascript module that takes your source colors array and configuration object, and returns a gradient suitable for your needs. Just choose a mode from `raw`, `css`, `svg` or `canvas`.

Gradient maker uses `chroma-js` color manipulation library for gradient generation (Copyright (c) 2011-2017, Gregor Aisch).

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
GradientMaker class takes 3 parameters: hex or rgba (in css format) string colors array, configuration object and mode, so it knows which type of output should it produce. 
```javascript
const gradientMaker = new GradientMaker([
    '#ffcc00',
    '#3412f0'
], {
    type: 'radial',
    shape: 'ellipse',
    top: 20,
    left: 10,
    extent: 'farthest-side'
}, 'css')

const gradient = gradientMaker.gradient()
```

## Configuration format:
```javascript
{
    // required
    // options for chroma-js gradient generation ('raw' mode options)
    base: {
        interpolation: 'linear' | 'bezier',
        mode: 'none' | 'lch' | 'lab' | 'rgb' | 'hsv' | 'hsl' | 'hsi' | 'hcl', // ignored with 'bezier' interpolation
        samples: number,  // size of the raw output array
        lightnessCorrection: boolean
    },
    // options for css gradient generation (optional)
    css: {
        type: 'linear' | 'radial', // required
        angle: number, // optional, only for linear gradients
        // properties for radial gradient:
        shape: 'circle' | 'ellipse', // required
        top: number
        left: number
        // ignored when the shape is a circle:
        extent: 'farthest-side', 'closest-side', 'farthest-corner', 'farthest-side'
    },
    svg: {
        type: 'linear' | 'radial',
        stops: number[] // must have extactly the same length as the colors array
    }
}
```