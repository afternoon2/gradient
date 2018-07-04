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
`GradientMaker.gradient` function takes 2 parameters: hex or rgba (in css format) string colors array and configuration object.
```javascript
const gradientMaker = new GradientMaker()

const gradient = gradientMaker.gradient([
    '#ffcc00',
    '#3412f0'
], {
    type: 'radial',
    shape: 'ellipse',
    top: 20,
    left: 10,
    extent: 'farthest-side'
})
```

## Configuration format
### Base
Base entry in the configuration object is mandatory. Without it, the gradient maker couldn't produce any output.
- `interpolation` - 'linear' | 'bezier'
- `mode` - 'none' | 'lch' | 'lab' | 'rgb' | 'hsv' | 'hsl' | 'hsi' | 'hcl' (this entry is ignored when the interpolation is set to 'bezier')
- `samples` - number of output step colors
- `lightnessCorrection` - boolean, decides whether to use chroma `correctLightness()` function

### Css
Css entry in the configuration object is mandatory if you want to get css gradient string as an output
- `type`: 'linear' | 'radial'
- `angle`: number, ignored if you choose the radial gradient type
- `shape`: 'ellipse' | 'circle' - ignored if you choose the linear gradient type. Mandatory for radial gradients
- `top`: number within percentage range (top position of the radial gradient)
- `left`: number within percentage range (left position of the radial gradient)
- `extent`: 'farthest-side', 'closest-side', 'farthest-corner', 'farthest-side' - extent keyword (optional, ignored if the shape is set to 'circle')

### Configuration example
```javascript
{
    base: {
        interpolation: 'bezier',
        mode: 'none',
        samples: 10
        lightnessCorrection: true
    },
    css: {
        type: 'radial',
        angle: number,
        shape: 'ellipse',
        top: 44
        left: 30
        extent: 'farthest-side'
    }
}
```

### Multiple gradients
If you want to get multiple gradients, replace single colors array with array of color arrays, and a config object with array of those.

### Note about opacity
Remember that if you provide colors in hexadecimal format, you will not see the effects of multiplying, because there will be no opacity set. For multiple gradients initial strings should be in rgba format, unless you don't want to handle the transparency. You can also set blend mode to get desired visual effect.