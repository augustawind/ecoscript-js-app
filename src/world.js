const _ = require('lodash');

function vector(x, y) {
    return { x, y };
}

function world(things) {
    const world = {};

    world.things = Array.from(things);

    world.height = world.things.length;
    world.width = world.things[0].length;

    if (_.some(things, row => row.length !== world.width))
        throw new Error('Width and/or height do not match things array');

    world.get = (vector) => {
        return world.things[vector.y][vector.x];
    };

    world.set = (vector, thing) => {
        world.things[vector.y][vector.x] = thing;
    };

    world.isWalkable = (vector) => {
        return (
            _.inRange(vector.x, 0, world.width) &&
            _.inRange(vector.y, 0, world.height) &&
            world.get(vector).walkable);
    };

    world.turn = () => {
        _.each(world.things, (row, y) => {
            _.each(row, (thing, x) => {
                thing.act(world, vector(x, y));
            });
        });
    };

    return world;
}

module.exports = {
    vector,
    world,
};
