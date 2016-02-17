const _ = require('lodash');

function vector(x, y) {
    return { x, y };
}

class World {

    constructor(things) {
        this._things = Array.from(things);

        this._height = this._things.length;
        this._width = this._things[0].length;

        if (_.some(things, row => row.length !== this.width))
            throw new Error('Width/height do not match things array');
    }

    static fromLegend(legend, keysArray) {
        const things = keysArray.map(
            (keys) => keys.map((k) => legend.get(k)())
        );
        return new World(things);
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get things() {
        return this._things;
    }

    get(vector) {
        return this.things[vector.y][vector.x];
    }

    set(vector, thing) {
        this._things[vector.y][vector.x] = thing;
    }

    isWalkable(vector) {
        return (
            _.inRange(vector.x, 0, this.width) &&
            _.inRange(vector.y, 0, this.height) &&
            this.get(vector).walkable);
    }

    turn() {
        _.each(this.things, (row, y) => {
            _.each(row, (thing, x) => {
                thing.act(this, vector(x, y));
            });
        });
    }
}

module.exports = {
    vector,
    World,
};
