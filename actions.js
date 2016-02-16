const _ = require('lodash');

const W = require('./world');
const T = require('./thing');

function wander(thing) {
    return (world, vector) => {
        let dx = _.random(-1, 1);
        let dy = _.random(-1, 1);

        let vector2 = W.vector(vector.x + dx, vector.y + dy);

        if (W.isWalkable(world, vector2)) {
            W.set(world, vector, T.floor());
            W.set(world, vector2, thing);
        }
    };
}
