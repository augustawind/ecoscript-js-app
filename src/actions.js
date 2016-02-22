const _ = require('lodash');
const directions = require('./lib/directions');

function eat(world, vector) {
    for (const target of world.view(vector)) {
        const thing = world.get(target);
        if (thing && this.diet.includes(thing.name)) {
            world.remove(target);
            this.energy += thing.energy;
            return true;
        }
    }
    return false;
}

function wander(world, vector) {
    const dest = _.sample(world.viewWalkable(vector));
    if (dest) {
        const dir = dest.minus(vector);
        world.move(vector, dest);
        return true;
    }
    return false;
}

function bounce(world, vector) {
    if (!this.dir)
        this.dir = _.sample(directions);

    let dest = vector.plus(this.dir);
    if (!world.isWalkable(dest)) {
        dest = _.sample(world.viewWalkable(vector));
        if (!dest) 
            return false;
        this.dir = dest.minus(vector);
    }

    world.move(vector, dest);
    return true;
}

module.exports = {
    wander,
    eat,
    bounce
};
