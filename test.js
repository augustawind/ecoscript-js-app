const test = require('tape').test;
const World = require('./ecos').World;


const worldArgs = () => {
    const width = 5;
    const height = 3;
    const entities = (
        '_@#k.' +
        '%.- $' +
        'kllfb'
    ).split('');

    return {width, height, entities};
};


test('World', (assert) => {
    const {width, height, entities} = worldArgs();
    const world = World(width, height, entities);

    assert.equal(world.width, width, 'width assigned correctly');
    assert.equal(world.height, height, 'height assigned correctly');
    assert.deepEqual(world.grid, entities,
                     'entities placed on grid correctly');

    assert.end();
});
