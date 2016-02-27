import _ from 'lodash'
import directions from './lib/directions'

function reproduce(world, vector) {
    if (this.energy < this.maxEnergy * (Math.random() + 0.8))
        return false

    const target = _.sample(world.viewWalkable(vector))
    if (!target)
        return false

    this.energy = this.baseEnergy
    world.set(target, this.cloneFresh())
    return true
}

function grow(world, vector) {
    this.energy += this.growthRate
    return true
}

function metabolize(world, vector) {
    const rate = Math.round(this.maxEnergy * (this.metabolism / 100))
    this.energy -= rate

    if (this.energy <= 0) {
        world.remove(vector)
        return true
    }

    return false
}

function eat(world, vector) {
    for (const target of world.view(vector)) {
        const thing = world.get(target)
        if (thing && this.diet.includes(thing.name)) {
            world.remove(target)
            this.energy += thing.energy
            return true
        }
    }
    return false
}

function wander(world, vector) {
    const dest = _.sample(world.viewWalkable(vector))
    if (dest) {
        world.move(vector, dest)
        return true
    }
    return false
}

function bounce(world, vector) {
    if (!this.dir)
        this.dir = _.sample(directions)

    let dest = vector.plus(this.dir)
    if (!world.isWalkable(dest)) {
        dest = _.sample(world.viewWalkable(vector))
        if (!dest) 
            return false
        this.dir = dest.minus(vector)
    }

    world.move(vector, dest)
    return true
}

export default {
    wander,
    eat,
    bounce,
    grow,
    reproduce,
    metabolize,
}
