const Thing = require('../lib/thing');
const validate = require('../lib/validateArgs');
const actions = require('./actions');

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

class Animal extends Organism {

    constructor(params) {
        validate(params, ['diet', 'metabolism']);
        params.walkable = false;
        super(params);
    }

    get eat() {
        return actions.eat;
    }

    get wander() {
        return actions.wander;
    }
}

class Plant extends Organism {

    constructor() {
        super({
            name: 'plant',
            walkable: false,
            image: '*',
            baseEnergy: 20,
            maxEnergy: 50,
        });
    }
}

class Herbivore extends Animal {

    constructor() {
        super({
            name: 'herbivore',
            image: 'H',
            baseEnergy: 30,
            maxEnergy: 70,
            metabolism: 50,
            diet: ['plant']
        });
    }

    act(world, vector) {
        return (
            this.eat(world, vector) ||
            this.wander(world, vector)
        );
    }
}

class Predator extends Animal {

    constructor() {
        super({
            name: 'predator',
            image: '@',
            baseEnergy: 50,
            maxEnergy: 90,
            metabolism: 80,
            diet: ['herbivore']
        });
    }

    act(world, vector) {
        return (
            this.eat(world, vector) ||
            this.wander(world, vector)
        );
    }
}

module.exports = {
    Plant,
    Herbivore,
    Predator
};
