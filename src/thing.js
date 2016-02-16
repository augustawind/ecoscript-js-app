const _ = require('lodash');

function validate (expected) {
    return (params) => {
        if (_.every(expected, p => p in params))
            throw new Error('Missing parameters');
    };
}

const validateThing = validate(['name', 'walkable']);

function thing (params) {
    validateThing(params);

    const thing = _.assign({}, params);
    thing.id = _.uniqueId();
    return thing;
}

function wall () {
    return thing({
        name: 'wall',
        walkable: false
    });
}

function floor () {
    return thing({
        name: 'floor',
        walkable: true
    });
}

const validateOrganism = validate(['energy']);

function organism (params) {
    validateOrganism(params);

    return thing(params);
}

module.exports = {
    thing,
    wall,
    floor,
    organism
};
