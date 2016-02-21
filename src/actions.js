const _ = require('lodash');

function wander(world, vector) {
    const dest = _.sample(world.viewWalkable(vector));
    if (dest) {
        world.move(vector, dest);
        return true;
    }
    return false;
}

function eat(world, vector, diet = []) {
    for (const target of world.view(vector)) {
        const thing = world.get(target);
        if (thing && diet.includes(thing.name)) {
            world.remove(target);
            this.energy += thing.energy;
            return true;
        }
    }
    return false;
}

module.exports = {
    wander,
    eat
};
