const _ = require('lodash');

const Vector = require('../lib/vector');

function wander(world, vector) {
    const dx = _.sample(directions);
    const dy = _.sample(directions);

    const vector2 = new Vector(vector.x + dx, vector.y + dy);

    if (world.isWalkable(vector2)) {
        world.set(vector, new Floor());
        world.set(vector2, this);
        return true;
    }
    return false;
}

function eat(world, vector) {
    for (const dir of directions) {
        const target = vector.plus(dir);
        const thing = world.get(target);
        if (thing.name === 'plant') {
            world.set(target, new Floor());
            return true;
        }
    }
    return false;
}

module.exports = {
    wander,
    eat
};
