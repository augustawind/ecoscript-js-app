function validate(params, expected) {
    if (!expected.every(p => p in params))
        throw new Error('Missing parameters');
}

module.exports = validate;
