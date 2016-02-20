const World = require('../lib/world');

const things = require('./things');


const ecosystem = World.fromLegend(
    new Map([
        ['#', things.Wall],
        ['.', things.Floor],
        ['*', things.Plant],
        ['H', things.Herbivore]
    ]),
    [
        '#######'.split(''),
        '#.*...#'.split(''),
        '#.*...#'.split(''),
        '#..*..#'.split(''),
        '#..H..#'.split(''),
        '#.....#'.split(''),
        '#######'.split('')
    ]
);

module.exports = ecosystem;
