const vector = (x, y) => { x, y };

function world (things) {
    things = Array.from(things);

    let height = things.length;
    let width = things[0].length;

    const valid = _.every(things, row => row.length === width);
    if (!valid)
        throw new Error('Width and/or height do not match things array');

    return things;
}


function get (world, vector) {
    return world[vector.y][vector.x];
}

function set (world, vector, thing) {
    world[vector.y][vector.x] = thing;
}

function turn (world) {
    _(world).forEach(thing => {
        thing.act;
    });
};
