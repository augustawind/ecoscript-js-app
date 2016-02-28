import stampit from 'stampit'

import things from './things'
import World from './world'
import * as settings from './settings'

const Wall = stampit({
    refs: {
        name: 'wall',
        image: '#',
        walkable: false,
    }
})

const Shrub = stampit({
    refs: settings.Shrub,
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
    refs: settings.Herbivore,
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
    props: settings.Predator,
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
