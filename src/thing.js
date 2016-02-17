const _ = require('lodash');

function validate(params, expected) {
    if (!expected.every(p => p in params))
        throw new Error('Missing parameters');
}

class Thing {

    constructor(params) {
        this.id = _.uniqueId();

        validate(params, ['name', 'walkable']);
        Object.assign(this, params);
    }

    act(world, vector) {
        return;
    }

}

class Organism extends Thing {

    constructor(params) {
        validate(params, ['energy']);
        super(params);
    }

}

module.exports = {
    Thing,
    Organism
};
