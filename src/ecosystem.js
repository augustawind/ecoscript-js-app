import stampit from 'stampit'

import things from './things'
import World from './world'
import * as config from './config'

const Wall = stampit({
    refs: config.Wall,
})

const Shrub = stampit({
    refs: config.Shrub,
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
    refs: config.Herbivore,
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
    props: config.Predator,
    methods: {
        act(world, vector) {
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
