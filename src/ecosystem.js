const World = require('../lib/world');

const things = require('./things');


const ecosystem = World.fromLegend(
    new Map([
        ['#', things.Wall],
        ['*', things.Plant],
        ['H', things.Herbivore]
    ]),
    [
        '####################',
        '# ** H             #',
        '#  ***             #',
        '#   *  ***         #',
        '#   *   **   H  ***#',
        '#              ****#',
        '#     *    H  *****#',
        '#    ***        ***#',
        '#   *****         *#',
        '#    ***           #',
        '####################',
    ]
);

module.exports = ecosystem;
