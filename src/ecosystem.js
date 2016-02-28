import stampit from 'stampit'

import things from './things'
import World from './world'

const Wall = stampit({
    refs: {
        name: 'wall',
        image: '#',
        walkable: false,
    }
})

const Shrub = stampit({
    init() {
        this.baseEnergy = 3 + Math.random() * 4
    },
    props: {
        name: 'plant',
        image: '*',

        maxEnergy: 20,
        growthRate: 1,
    },
    methods: {
        act(world, vector) {
            return (
                this.reproduce(world, vector) ||
                this.grow(world, vector)
            )
        },
    },
}).compose(things.Plant)

const Herbivore = stampit({
    props: {
        name: 'herbivore',
        image: 'H',

        baseEnergy: 20,
        maxEnergy: 60,

        metabolism: 0.2,
        diet: ['plant'],
    },
    methods: {
        act(world, vector) {
            return (
                this.eat(world, vector) ||
                this.bounce(world, vector)
            )
        },
    },
}).compose(things.Animal, things.CanBounce)

const Predator = stampit({
    props: {
        name: 'predator',
        image: '@',

        baseEnergy: 30,
        maxEnergy: 70,

        metabolism: 0.2,
        diet: ['herbivore'],
    },
    methods: {
        act(world, vector) {
            console.log(this.energy)
            return (
                this.eat(world, vector) ||
                this.energy < 10 ||
                this.wander(world, vector)
            )
        }
    },
}).compose(things.Animal, things.CanWander)
        
const ecosystem = World.fromLegend(
    new Map([
        ['#', Wall],
        ['*', Shrub],
        ['H', Herbivore],
        ['@', Predator],
    ]),
    [
        '####################################################',
        '#                 ####         ****              ###',
        '#   *  @  ##                 ########       HH    ##',
        '#   *    ##        H H                 ****       *#',
        '#       ##*                        ##########     *#',
        '#      ##***  *         ****                     **#',
        '#* **  #  *  ***      #########                  **#',
        '#* **  #      *               #   *              **#',
        '#     ##              #   H   #  ***          ######',
        '#*            @       #       #   *        H  #    #',
        '#*                    #  ######                 ** #',
        '###          ****          ***                  ** #',
        '#       H                        @         H       #',
        '#   *     ##  ##  ##  ##               ###      *  #',
        '#   **         #              *       #####  H     #',
        '##  **  H   H  #  #    ***  ***        ###      ** #',
        '###               #   *****                    ****#',
        '####################################################',
    ]
)

export { ecosystem as default }
