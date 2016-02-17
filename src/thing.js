const _ = require('lodash');

function validate(params, expected) {
    if (!expected.every(p => p in params))
        throw new Error('Missing parameters');
}

function thing(params) {
    validate(params, ['name', 'walkable']);

    const thing = {
        id: _.uniqueId()
    };
    Object.assign(thing, params);

    return thing;
}

function organism(params) {
    validate(params, ['energy']);

    return thing(params);
}

module.exports = {
    thing,
    organism
};
