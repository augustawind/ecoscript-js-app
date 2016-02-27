function validate(params, expected) {
    if (!expected.every(p => p in params)) 
        throw new Error(
            `Missing one or more parameters: ${expected.join(', ')}`)
}

module.exports = validate
