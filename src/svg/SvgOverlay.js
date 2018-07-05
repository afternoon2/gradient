import Overlay from '../Overlay'

/**
 * @typedef {object} SvgOptions - SvgOverlay component's configuration object
 * @property {string} type - linear or radial
 * @property {id} string - gradient unique identifier
 * @property {number[]} offsets - array with color stop's offset values (percentages)
 * @property {number} [x1] - linear gradient's first point's position on the x axis
 * @property {number} [y1] - linear gradient's first point's position on the y axis
 * @property {number} [x2] - linear gradient's second point's position on the x axis
 * @property {number} [y2] - linear gradient's second point position on the y axis
 * @property {number} [cx] - radial gradient's center point position on the x axis
 * @property {number} [cy] - radial gradient's center point position on the y axis
 * @property {number} [fx] - radial gradient's focal point position on the x axis
 * @property {number} [fy] - radial gradient's focal point position on the y axis
 * @property {string} [spreadMethod] - radial gradient's spread method: 'pad', 'repeat' or 'reflect'
 */
