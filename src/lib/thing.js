const validate = require('./validateArgs');

class Thing {

    constructor(params) {
        validate(params, ['name', 'walkable']);
        Object.assign(this, params);
    }
}

module.exports = Thing;
