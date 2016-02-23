const Thing = require('./lib/thing');
const actions = require('./actions');

// Base classes --------------------------------------------------------------

class Organism extends Thing {

    constructor(params, expected = []) {
        params.walkable = false;
        expected.push('baseEnergy', 'maxEnergy');
        super(params, expected);

        this._energy = this.baseEnergy;
    }

    get energy() {
        return this._energy;
    }

    set energy(energy) {
        this._energy = Math.max(0, Math.min(energy, this.maxEnergy));
    }

    get reproduce() {
        return actions.reproduce;
    }
}

class Plant extends Organism {

    constructor(params, expected = []) {
        expected.push('growthRate');
        super(params, expected);
    }

    get grow() {
        return actions.grow;
    }
}

class Animal extends Organism {

    constructor(params, expected = []) {
        expected.push('diet', 'metabolism');
        super(params, expected);
    }

    get metabolize() {
        return actions.metabolize;
    }

    get eat() {
        return actions.eat;
    }
}

// Plants --------------------------------------------------------------------

class Shrub extends Plant {

    constructor() {
        super({
            name: 'plant',
            image: '*',

            baseEnergy: 20,
            maxEnergy: 50,
            growthRate: 1,
        });
    }

    act(world, vector) {
        return (
            this.reproduce(world, vector) ||
            this.grow(world, vector)
        );
    }
}

// Animals -------------------------------------------------------------------

class Herbivore extends Animal {

    constructor() {
        super({
            name: 'herbivore',
            image: 'H',

            baseEnergy: 30,
            maxEnergy: 70,

            metabolism: 10,
            diet: ['plant']
        });
    }

    act(world, vector) {
        return (
            this.reproduce(world, vector) ||
            this.eat(world, vector) ||
            this.wander(world, vector)
        );
    }

    get wander() {
        return actions.wander;
    }
}

class Predator extends Animal {

    constructor() {
        super({
            name: 'predator',
            image: '@',

            baseEnergy: 50,
            maxEnergy: 90,

            metabolism: 5,
            diet: ['herbivore']
        });
    }

    act(world, vector) {
        return (
            this.reproduce(world, vector) ||
            this.eat(world, vector) ||
            this.bounce(world, vector)
        );
    }

    get bounce() {
        return actions.bounce;
    }
}

// ---------------------------------------------------------------------------

module.exports = {
    Shrub,
    Herbivore,
    Predator,
};
