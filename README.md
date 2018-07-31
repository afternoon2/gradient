# gradient.js
## Gradient creation library running in the browser 🖌🌈

Gradient maker is a javascript module that takes your source colors array and configuration object, and returns a gradient suitable for your needs. Just choose a mode from `raw`, `css` or `svg`.

Gradient maker uses `chroma-js` color manipulation library for gradient generation (Copyright (c) 2011-2017, Gregor Aisch).

You need to install `chroma-js` as a dependency to start gradient.js working.

## Contents
- [gradient.js](#gradientjs)
    - [Gradient creation library running in the browser 🖌🌈](#gradient-creation-library-running-in-the-browser-%F0%9F%96%8C%F0%9F%8C%88)
    - [Contents](#contents)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Parameters](#parameters)
        - [Colors](#colors)
        - [Options](#options)
    - [Example](#example)
    - [Notes](#notes)

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

Depending on your needs, you can use one of two (in future - three) modules: `Base`, `Css` and ~~`Svg`~~. In fact, both - `Css` ~~and `Svg` are~~ is using the `Base` as a required internal dependency.

So if you want to get a gradient as a array of arrays of rgb(a) numbers, you type following code:

```javascript
import Base from 'gradient'

const base = new Base(yourConfig, yourInputColors)
const rawGradient = base.get() // number[][]
```

If you want to get a css gradient, you don't need to use `Base`. `Css` module does it for you.

```javascript
import Css from 'gradient'

const css = new Css(yourConfig, yourInputColors)
const cssGradient = css.get() // css string
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

Or an array of css rgb(a) strings.

```javascript
[
    'rgba(10, 23, 34, 0.5)',
    'rgba(47, 3, 120, 0.5)'
]
```

Please note, that input colors are the source for further creation of probably bigger amount of output colors, so try to insert max. 5 colors as an input for better visual effect.

### Options

The shape of the options object will change depending on the module you are going to use. So in case of getting raw number gradient you will need to pass a `Base` options object. If you want to get a css, the options will have to consist of two entries with two configuration objects. **You must always pass the `Base` options to your configuration**. You will find the options descriptions in the links below.

- [Base options description](https://github.com/afternoon2/gradient-base#options)
- [Css options description](https://github.com/afternoon2/gradient-css#options)

## Example
```javascript
// Raw gradient (base)
import Base from 'gradient'

const base = new Base([
    [10, 33, 22, 0.90],
    [120, 23, 44, 1]
], {
    interpolation: 'bezier',
    mode: 'none',
    samples: 10,
    lightnessCorrection: true
})

const rawGradient = base.get()

// css gradient
import Css from 'gradient'

const css = new Css([
    [10, 33, 22, 0.90],
    [120, 23, 44, 1]
], {
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
    }
})
const cssGradient = css.get()
```

## Notes

**The `bezier` interpolation ignores opacity values.**