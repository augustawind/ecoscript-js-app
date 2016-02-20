const inRange = require('lodash/inRange');

const Vector = require('./vector');


class World {

    constructor(things) {
        this._things = Array.from(things);

        this._height = this._things.length;
        this._width = this._things[0].length;

        if (things.some(row => row.length !== this.width))
            throw new Error('Width/height do not match things array');
    }

    static fromLegend(legend, keysArray) {
        return new World(
            keysArray.map(keys => {
                return keys.map(k => {
                        const Thing = legend.get(k);
                        return new Thing();
                    });
            })
        );
    }

    *iterThings() {
        for (let [y, row] of this._things.entries()) {
            for (let [x, thing] of row.entries()) {
                yield [new Vector(x, y), thing];
            }
        }
    }

    toString() {
        return this.things.map(row => {
            return row.map(thing => thing.image).join('');
        }).join('\n');
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
        return this._things[vector.y][vector.x];
    }

    set(vector, thing) {
        this._things[vector.y][vector.x] = thing;
    }

    isWalkable(vector) {
        return (
            inRange(vector.x, 0, this.width) &&
            inRange(vector.y, 0, this.height) &&
            this.get(vector).walkable);
    }

    turn() {
        for (let [vector, thing] of this.iterThings()) {
                thing.act(this, vector);
        }
    }
}

module.exports = World;
