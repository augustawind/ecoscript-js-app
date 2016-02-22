const inRange = require('lodash/inRange');
const map = require('lodash/map');

const Vector = require('./vector');
const directions = require('./directions');

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
            map(keysArray, keys => {
                return map(keys, k => {
                    if (legend.has(k)) {
                        const Thing = legend.get(k);
                        return new Thing();
                    }
                    return null;
                });
            })
        );
    }

    *iterThings() {
        for (const [y, row] of this.things.entries()) {
            for (const [x, thing] of row.entries()) {
                yield [new Vector(x, y), thing];
            }
        }
    }

    toString() {
        return this.things.map(row => {
            return row.map(thing => thing ? thing.image : ' ').join('');
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

    _view(vector) {
        return directions.map(d => vector.plus(d));
    }

    view(vector) {
        return this._view(vector).filter(v => this.inBounds(v));
    }

    viewWalkable(vector) {
        return this._view(vector).filter(v => this.isWalkable(v));
    }

    get(vector) {
        return this.things[vector.y][vector.x];
    }

    set(vector, thing) {
        this._things[vector.y][vector.x] = thing;
    }

    remove(vector) {
        this.set(vector, null);
    }

    move(vector1, vector2) {
        const thing = this.get(vector1);
        this.set(vector2, thing);
        this.remove(vector1);
    }

    inBounds(vector) {
        return (inRange(vector.x, 0, this.width) &&
                inRange(vector.y, 0, this.height));
    }

    isWalkable(vector) {
        if (this.inBounds(vector)) {
            const thing = this.get(vector);
            return !thing || thing.walkable;
        }
        return false;
    }

    turn() {
        for (const [vector, thing] of this.iterThings()) {
            if (thing)
                thing.act(this, vector);
        }
    }
}

module.exports = World;
