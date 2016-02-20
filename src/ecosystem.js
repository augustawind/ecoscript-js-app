const _ = require('lodash');

const Vector = require('../lib/vector');
const World = require('../lib/world');
const Thing = require('../lib/thing');
const validate = require('../lib/validateArgs');
const directions = require('../lib/directions');

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

class Organism extends Thing {

    constructor(params) {
        validate(params, ['energy']);
        super(params);
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

class Herbivore extends Organism {

    constructor() {
        super({
            name: 'herbivore',
            walkable: false,
            energy: 30,
            image: 'H'
        });
    }

    act(world, vector) {
        if (!this.eat(world, vector))
            this.wander(world, vector);
    }

    get wander() {
        return wander;
    }

    get eat() {
        return eat;
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
