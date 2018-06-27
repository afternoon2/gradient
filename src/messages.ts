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
        noWithAngle: `
            Missing withAngle property in the 'meta' entry of css configuration object
        `,
        angleIgnored: `
            withAngle property in the 'meta' entry of css configuration file set to false,
            angle value will be ignored
        `,
        noAngle: `
            Missing angle property in css configuration object
        `,
        topLeftWithNoPosition: `
            Top and left properties will be ignored because there is no position property provided
        `,
        invalidPositionType: `
            Invalid position property provided. Expected: boolean
        `,
        missingTopOrLeftProperty: `
            Top or left radial gradient property is missing
        `
    }
}