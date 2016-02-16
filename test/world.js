const test = require('tape');
const W = require('../src/world');

test('world.world', t => {
    t.plan(1);

    const things = [
        '####'.split(''),
        '#..#'.split(''),
        '####'.split(''),
    ];
    const world = W.world(things)

    t.deepEqual(world.things, things);
});

test('world.get', t => {
    t.plan(3);

    const things = [
        '####'.split(''),
        '#..#'.split(''),
        '@###'.split(''),
    ];
    const world = W.world(things)

    const v1 = W.vector(0, 0); // #
    const v2 = W.vector(2, 1); // .
    const v3 = W.vector(0, 2); // @

    t.equal(world.get(v1), '#');
    t.equal(world.get(v2), '.');
    t.equal(world.get(v3), '@');
});

test('world.set', t => {
    t.plan(3);

    const things = [
        '####'.split(''),
        '#..#'.split(''),
        '####'.split(''),
    ];
    const world = W.world(things)

    const v1 = W.vector(0, 0); // #
    const v2 = W.vector(2, 1); // .
    const v3 = W.vector(0, 2); // @

    world.set(v1, '!');
    world.set(v2, '@');
    world.set(v3, '$');
    t.equal(world.get(v1), '!');
    t.equal(world.get(v2), '@');
    t.equal(world.get(v3), '$');
});

test('world.isWalkable', t => {
    t.plan(3);

    const yes = {walkable: true};
    const no = {walkable: false};

    const things = [
        [yes, yes, no],
        [no, yes, no]
    ];
    const world = W.world(things);

    const v1 = W.vector(0, 0); // yes
    const v2 = W.vector(2, 1); // no
    const v3 = W.vector(1, 0); // yes

    t.equal(world.isWalkable(v1), true);
    t.equal(world.isWalkable(v2), false);
    t.equal(world.isWalkable(v3), true);
});

test('world.turn', t => {
    t.plan(3);

    const thing1 = {act: (world, vector) => world.set(vector, '1')};
    const thing2 = {act: (world, vector) => world.set(vector, '2')};
    const thing3 = {act: (world, vector) => world.set(vector, '3')};

    const things = [
        [thing1, thing1, thing1],
        [thing2, thing2, thing2], 
        [thing3, thing3, thing3] 
    ];
    const world = W.world(things);

    const v1 = W.vector(0, 0);
    const v2 = W.vector(1, 1);
    const v3 = W.vector(2, 2);

    world.turn();

    t.equal(world.get(v1), '1');
    t.equal(world.get(v2), '2');
    t.equal(world.get(v3), '3');
});
