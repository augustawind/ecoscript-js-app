const validate = require('./validateArgs');

class Thing {

    constructor(params, expected = []) {
        expected.push('name', 'walkable', 'image');
        validate(params, expected);

        this.initialParams = params;
        Object.assign(this, params);
    }

    multiply() {
        return new Thing(this.initialParams);
    }
}

module.exports = Thing;
