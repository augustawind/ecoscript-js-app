const _ = require('lodash');

const Vector = require('../lib/vector');
const directions = require('../lib/directions');

function *rotate(collection, start) {
    for (let i = start; i < collection.length; i++) {
        yield collection[i];
    }
    for (let i = 0; i < start; i++) {
        yield collection[i];
    }
}

function wander(world, vector) {
    const start = _.random(directions.length);
    for (const dir of rotate(directions, start)) {
        const vector2 = vector.plus(dir);

        if (world.isWalkable(vector2)) {
            world.move(vector, vector2);
            return true;
        } 
    }
    return false;
}

function eat(world, vector) {
    for (const dir of directions) {
        const target = vector.plus(dir);
        const thing = world.get(target);
        if (thing && thing.name === 'plant') {
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
