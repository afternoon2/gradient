# gradient.js [gradient-all]
## Gradient creation library running in the browser 🖌🌈

[![License](https://img.shields.io/npm/l/gradient-all.svg?style=flat)](https://github.com/afternoon2/gradient/blob/master/LICENSE)&nbsp;&nbsp;
[![Travis build](https://img.shields.io/travis/afternoon2/gradient.svg?style=flat)](https://travis-ci.org/afternoon2/gradient)

gradient.js is a javascript module that takes your source colors array and configuration object, and returns a gradient suitable for your needs.

gradient.js is built on top of `chroma-js` color manipulation library (Copyright (c) 2011-2017, Gregor Aisch).

You need to install `chroma-js` as a dependency to start working with gradient.js.

## Contents
- [gradient.js [gradient-all]](#gradientjs-gradient-all)
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
npm install --save-dev gradient-all
```
2. Via browser as a umd module
```html
<script src="https://unpkg.com/gradient-all@1.0.0/gradient.js">
```

## Usage

Depending on your needs, you can use one of the three modules: `Base`, `Css` and `Svg`. The `Css` and `Svg` modules are using `Base` under the hood as an internal dependency.

So if you want to get a gradient as an array of arrays of rgb(a) numbers, type the following code:

```javascript
import { Base } from 'gradient'

const base = new Base()
const rawGradient = base.get(yourColors, yourConfig) // number[][]
```

If you want to get a css gradient, you don't need to use the `Base`. `Css` does it for you.

```javascript
import { Css } from 'gradient'

const css = new Css()
const cssGradient = css.get(yourColors, yourConfig) // css string
```

The same applies to the SVG module

```javascript
import { Svg } from 'gradient'

const svg = new Svg()
const svgGradient = svg.get(yourColors, yourConfig) // svg gradient element
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

Please note that the input colors are the source for further creation of probably bigger amount of outputs. Try to insert max. 5 colors as an input for better visual effect.

### Options

The shape of the options object will change depending on the module you are going to use. So in case of getting raw numbers gradient you will need the `Base` options object. 

If you want to get a css gradient, the options will have to consist of two entries with two configuration objects. 

**You must always pass the `Base` options to your configuration**.

- [Base options description](https://github.com/afternoon2/gradient-base#options)
- [Css options description](https://github.com/afternoon2/gradient-css#options)
- [Svg options description](https://github.com/afternoon2/gradient-svg#options)

## Example
```javascript
import { Base, Css, Svg } from 'gradient'

const colors = [
    [10, 33, 22, 0.90],
    [120, 23, 44, 1]
]
const baseConfig = {
    interpolation: 'bezier',
    mode: 'none',
    samples: 10,
    lightnessCorrection: true
}

const base = new Base()
const css = new Css()
const svg = new Svg()

const rawGradient = base.get(colors, baseConfig)
const cssGradient = css.get({
    base: baseConfig,
    css: {
        type: 'radial',
        shape: 'ellipse',
        top: 44,
        left: 30,
        extent: 'farthest-side'
    }
})
const svgGradient = svg.get(colors, {
    base: baseConfig,
    svg: {
        type: 'radial',
        cx: 0.5,
        cy: 0.5,
        r: 0.4,
        spreadMethod: 'reflect'
    }
})
```

## Notes

* **The `bezier` interpolation ignores opacity values.**
