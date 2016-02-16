function validate (expected) {
    return (params) => _(expected).every(p => p in params);
};

validateThing = validate(['name', 'walkable']);

function thing (params) {
    if (!validateThing(params))
        throw new Error('Missing params');

    const thing = _.assign({}, params);
    thing.id = _.uniqueId();
    return thing;
}

function wall () {
    return thing({
        name: 'wall',
        walkable: false
    });
};

function floor () {
    return thing({
        name: 'floor',
        walkable: true
    });
};

validateOrganism = validate(['energy']);

function organism (params) {
    if (!validateOrganism(params))
        throw new Error('missing params');

    return thing(params);
}

