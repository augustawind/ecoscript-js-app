const test = require('tape');
const W = require('./world');

test('world', t => {
    t.plan(1);

    const things = [
        '####'.split(''),
        '#..#'.split(''),
        '####'.split(''),
    ];
    const world = W.world(things)

    t.deepEqual(world.things, things);
});
