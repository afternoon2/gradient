export default {
    base: {
        invalidColorFormat: `
                Wrong input format. Following string color types are accepted:
                - hex
                - rgba like:
                'rgba(255, 255, 255, 0.25)' or
                'rgba(255, 255, 255, .25)'
            `,
        mixedArray: `
                Colors array contains strings of both rgba and hex strings.
                Please provide rgba strings only.
            `,
        invalidConfig: 'Invalid input object provided'
    },
    css: {
        noGradientType: `
            Missing gradient type property in css configuration object
        `,
        noAngle: `
            Missing angle property in css configuration object
        `,
        noShape: `
            Missing shape property in css configuration object.
        `
    }
}