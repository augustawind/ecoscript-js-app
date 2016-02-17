const _ = require('lodash');

const { Vector, World } = require('./world');
const { Thing, Organism } = require('./thing');

class Wall extends Thing {

    constructor() {
        super({
            name: 'wall',
            walkable: false,
            image: '#'
        });
    }
}

class Floor extends Thing {

    constructor() {
        super({
            name: 'floor',
            walkable: true,
            image: '.'
        });
    }
}

class Plant extends Organism {

    constructor() {
        super({
            name: 'plant',
            walkable: false,
            energy: 20,
            image: '*'
        });
    }
}

function wander(world, vector) {
    const dx = _.random(-1, 1);
    const dy = _.random(-1, 1);

    const vector2 = new Vector(vector.x + dx, vector.y + dy);

    if (world.isWalkable(vector2)) {
        world.set(vector, new Floor());
        world.set(vector2, this);
    }
}

function eat(world, vector) {
    // const dir = _.sample(util.directions);
    return;
}

class Herbivore extends Organism {

    constructor() {
        super({
            name: 'herbivore',
            walkable: false,
            energy: 30,
            image: 'H'
        });
    }

    get act() {
        return wander;
    }
}

const ecosystem = World.fromLegend(
    new Map([
        ['#', Wall],
        ['.', Floor],
        ['*', Plant],
        ['H', Herbivore]
    ]),
    [
        '#######'.split(''),
        '#.*...#'.split(''),
        '#.*...#'.split(''),
        '#..*..#'.split(''),
        '#..H..#'.split(''),
        '#.....#'.split(''),
        '#######'.split('')
    ]
);

module.exports = ecosystem;
