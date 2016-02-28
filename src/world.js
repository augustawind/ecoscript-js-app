import inRange from 'lodash/inRange'
import map from 'lodash/map'

const VectorType = {
    get x() {
        return this.x
    },
    get y() {
        return this.y
    },
    plus(vector) {
        return Vector(this.x + vector.x, this.y + vector.y)
    },
    minus(vector) {
        return Vector(this.x - vector.x, this.y - vector.y)
    },
}

function Vector(x, y) {
    return {
        __proto__: VectorType,
        x,
        y,
    }
}

const directions = [
    Vector(0, -1),
    Vector(1, -1),
    Vector(1, 0),
    Vector(1, 1),
    Vector(0, 1),
    Vector(-1, 1),
    Vector(-1, 0),
    Vector(-1, -1),
]

class World {

    constructor(things) {
        this._things = Array.from(things)

        this._height = this._things.length
        this._width = this._things[0].length

        if (things.some(row => row.length !== this.width))
            throw Error('Width/height do not match things array')
    }

    static fromLegend(legend, keysArray) {
        return new World(
            map(keysArray, keys => {
                return map(keys, k => {
                    if (legend.has(k)) {
                        const Thing = legend.get(k)
                        return Thing()
                    }
                    return null
                })
            })
        )
    }

    enumerate() {
        const things = []
        for (const [y, row] of this.things.entries()) {
            for (const [x, thing] of row.entries()) {
                things.push([Vector(x, y), thing])
            }
        }
        return things
    }

    toString() {
        return this.things.map(row => {
            return row.map(thing => thing ? thing.image : ' ').join('')
        }).join('\n')
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    get things() {
        return this._things
    }

    _view(vector) {
        return directions.map(d => vector.plus(d))
    }

    view(vector) {
        return this._view(vector).filter(v => this.inBounds(v))
    }

    viewWalkable(vector) {
        return this._view(vector).filter(v => this.isWalkable(v))
    }

    get(vector) {
        return this.things[vector.y][vector.x]
    }

    set(vector, thing) {
        this._things[vector.y][vector.x] = thing
    }

    remove(vector) {
        this.set(vector, null)
    }

    move(vector1, vector2) {
        const thing = this.get(vector1)
        this.set(vector2, thing)
        this.remove(vector1)
    }

    inBounds(vector) {
        return inRange(vector.x, 0, this.width) &&
               inRange(vector.y, 0, this.height)
    }

    isWalkable(vector) {
        if (this.inBounds(vector)) {
            const thing = this.get(vector)
            return !thing || thing.walkable
        }
        return false
    }

    turn() {
        for (const [vector, thing] of this.enumerate()) {
            if (thing) {
                if (thing.hasOwnProperty('energy') && thing.energy <= 0) {
                    this.remove(vector)
                } else if (thing.act) {
                    if (thing.preAct(this, vector) === false)
                        thing.act(this, vector)
                }
            }
        }
    }
}

export { World as default }
export { directions, Vector, World }
