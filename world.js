const _ = require('lodash');

function vector(x, y) {
   return { x, y };
}

function world(things) {
    const world = {};

    world.things = Array.from(things);

    world.height = world.things.length;
    world.width = world.things[0].length;

    const valid = _.every(things, row => row.length === world.width);
    if (!valid)
        throw new Error('Width and/or height do not match things array');

    return world;
}

function isWalkable(world, vector) {
    return (
        _.inRange(vector.x, 0, world.width) &&
        _.inRange(vector.y, 0, world.height) &&
        get(world, vector).walkable
    );
}

function get(world, vector) {
    return world.things[vector.y][vector.x];
}

function set(world, vector, thing) {
    world.things[vector.y][vector.x] = thing;
}

function turn(world) {
    _.each(world.things, thing => {
        thing.act;
    });
}

module.exports = {
    world
};
