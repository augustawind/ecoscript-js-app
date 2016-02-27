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
    props: {
        name: 'plant',
        image: '*',

        baseEnergy: 20,
        maxEnergy: 50,
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

        baseEnergy: 30,
        maxEnergy: 60,

        metabolism: 1,
        diet: ['plant'],
    },
    methods: {
        act(world, vector) {
            return (
                this.reproduce(world, vector) ||
                this.metabolize(world, vector) ||
                this.eat(world, vector) ||
                this.wander(world, vector)
            )
        },
    },
}).compose(things.Animal, things.CanWander)

const Predator = stampit({
    props: {
        name: 'predator',
        image: '@',

        baseEnergy: 50,
        maxEnergy: 70,

        metabolism: 1,
        diet: ['herbivore'],
    },
    methods: {
        act(world, vector) {
            return (
                this.reproduce(world, vector) ||
                this.metabolize(world, vector) ||
                this.eat(world, vector) ||
                this.bounce(world, vector)
            )
        }
    },
}).compose(things.Animal, things.CanBounce)
        
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
