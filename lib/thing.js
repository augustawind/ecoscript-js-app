const uniqueId = require('lodash/uniqueId');
const validate = require('./validateArgs');

class Thing {

    constructor(params) {
        this.id = uniqueId();

        validate(params, ['name', 'walkable']);
        Object.assign(this, params);
    }

    act(world, vector) {
        return true;
    }

}

module.exports = Thing;
