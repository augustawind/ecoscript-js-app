const Thing = require('../lib/thing');
const validate = require('../lib/validateArgs');

const actions = require('./actions');


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
        console.log(vector);
        if (this.eat(world, vector))
            return false;
        return this.wander(world, vector);
    }

    get wander() {
        return actions.wander;
    }

    get eat() {
        return actions.eat;
    }
}

module.exports = {
    Wall,
    Floor,
    Plant,
    Herbivore
};
