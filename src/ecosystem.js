import * as living from './organisms'
import * as things from './things'
import World from './lib/world'

const ecosystem = World.fromLegend(
    new Map([
        ['#', things.Wall],
        ['*', living.Shrub],
        ['H', living.Herbivore],
        ['@', living.Predator],
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

module.exports = ecosystem
