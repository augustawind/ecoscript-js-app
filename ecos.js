'use strict';

function World(width, height, entities) {
    if (entities.length !== width * height)
        throw new Error(
            'width and height must match length of entities array');

    const world = Object.create(null);

    world.width = width;
    world.height = height;

    world.grid = Array.from(entities);

    world.get = (x, y) => {
        return world.grid[x + (y * width)];
    };
    world.set = (x, y, value) => {
        world.grid[x + (y * width)] = value;
    };

    world.go = () => {
        world.grid.forEach((entity, i) => {
            let x = i % world.height;
            let y = i % world.width;
            if (entity.action)
                entity.action(x, y, world);
        });
    };

    return world;
}



// Actions
// -----------------------------------------------
function wander(x, y, world) {
    let x2 = x + 1;
    let y2 = y + 1;
    if (x2 < world.width && y2 < world.height) {
        world.set(x2, y2, this);
        world.set(x, y, Floor());
    }
}


// Static entities
// -----------------------------------------------
function Wall() {
    return {
        walkable: false,
        icon: '#',
    };
}

function Floor() {
    return {
        walkable: true,
        icon: ' '
    };
}


// Organisms
// -----------------------------------------------

function Organism() {
    return {
        walkable: false,
        energy: 10,
        icon: '@',
        action: wander
    };
}

module.exports = {
    World
};
