const _ = require('lodash');

const Vector = require('../lib/vector');
const directions = require('../lib/directions');

function wander(world, vector) {
    const dx = _.sample(directions);
    const dy = _.sample(directions);

    const vector2 = new Vector(vector.x + dx, vector.y + dy);

    if (world.isWalkable(vector2)) {
        world.move(vector, vector2);
        return true;
    }
    return false;
}

function eat(world, vector) {
    for (const dir of directions) {
        const target = vector.plus(dir);
        const thing = world.get(target);
        if (thing.name === 'plant') {
            world.remove(target);
            return true;
        }
    }
    return false;
}

module.exports = {
    wander,
    eat
};
