const World = require('./lib/world');
const things = require('./things');
const living = require('./organisms');

const ecosystem = World.fromLegend(
    new Map([
        ['#', things.Wall],
        ['*', living.Plant],
        ['H', living.Herbivore],
        ['@', living.Predator]
    ]),
    [
        '####################',
        '# ** H             #',
        '#  ***             #',
        '#   *  ***         #',
        '#   *   **   H  ***#',
        '#       @      ****#',
        '#     *    H  *****#',
        '#    ***        ***#',
        '#   *****         *#',
        '#    ***           #',
        '####################',
    ]
);

module.exports = ecosystem;
