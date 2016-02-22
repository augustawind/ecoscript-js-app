const validate = require('./validateArgs');

class Thing {

    constructor(params) {
        validate(params, ['name', 'walkable']);
        Object.assign(this, params);
    }

    act(world, vector) {
        return true;
    }

}

module.exports = Thing;
