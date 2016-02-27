class Vector {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    minus(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }
}

module.exports = Vector
