const Thing = require('../lib/thing');
const validate = require('../lib/validateArgs');

const actions = require('./actions');


class Wall extends Thing {

    constructor() {
        super({
            name: 'wall',
            walkable: false,
            image: '#' });
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
        validate(params, ['baseEnergy', 'maxEnergy']);
        super(params);
        this._energy = this.baseEnergy;
    }

    get energy() {
        return this._energy;
    }

    set energy(energy) {
        this._energy = Math.max(energy, this.maxEnergy);
    }
}

class Plant extends Organism {

    constructor() {
        super({
            name: 'plant',
            walkable: false,
            baseEnergy: 20,
            maxEnergy: 50,
            image: '*'
        });
    }
}

class Animal extends Organism {

    get eat() {
        return actions.eat;
    }

    get wander() {
        return actions.wander;
    }
}

class Herbivore extends Animal {

    constructor() {
        super({
            name: 'herbivore',
            walkable: false,
            baseEnergy: 30,
            maxEnergy: 70,
            image: 'H'
        });
    }

    act(world, vector) {
        return (
            this.eat(world, vector, ['plant']) ||
            this.wander(world, vector)
        );
    }
}

module.exports = {
    Wall,
    Floor,
    Plant,
    Herbivore
};
