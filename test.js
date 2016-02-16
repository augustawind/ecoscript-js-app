const test = require('tape');
const W = require('./world');

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

    t.equal(W.get(world, v1), '#');
    t.equal(W.get(world, v2), '.');
    t.equal(W.get(world, v3), '@');
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

    W.set(world, v1, '!');
    W.set(world, v2, '@');
    W.set(world, v3, '$');
    t.equal(W.get(world, v1), '!');
    t.equal(W.get(world, v2), '@');
    t.equal(W.get(world, v3), '$');
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

    t.equal(W.isWalkable(world, v1), true);
    t.equal(W.isWalkable(world, v2), false);
    t.equal(W.isWalkable(world, v3), true);
});

test('world.turn', t => {
    t.plan(3);

    const thing1 = {act: (world, vector) => W.set(world, vector, '1')};
    const thing2 = {act: (world, vector) => W.set(world, vector, '2')};
    const thing3 = {act: (world, vector) => W.set(world, vector, '3')};

    const things = [
        [thing1, thing1, thing1],
        [thing2, thing2, thing2], 
        [thing3, thing3, thing3] 
    ];
    const world = W.world(things);

    const v1 = W.vector(0, 0);
    const v2 = W.vector(1, 1);
    const v3 = W.vector(2, 2);

    W.turn(world);

    t.equal(W.get(world, v1), '1');
    t.equal(W.get(world, v2), '2');
    t.equal(W.get(world, v3), '3');
});
