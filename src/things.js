import Thing from './lib/thing'

class Wall extends Thing {

    constructor() {
        super({
            name: 'wall',
            walkable: false,
            image: '#',
        })
    }
}

class Floor extends Thing {

    constructor() {
        super({
            name: 'floor',
            walkable: true,
            image: '.',
        })
    }
}

export default {
    Wall,
    Floor
}
