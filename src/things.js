import _ from 'lodash'
import stampit from 'stampit'

import { directions } from './world'

const Organism = stampit({
    init({ stamp }) {
        this.another = stamp

        let energy = this.baseEnergy
        Reflect.defineProperty(this, 'energy', {
            get: () => energy,
            set: (x) => {
                energy = Math.max(0, Math.min(this.maxEnergy, x))
            }
        })
    },
    refs: {
        walkable: false,
    },
    methods: {
        reproduce(world, vector) {
            if (this.energy < this.maxEnergy)
                return false

            const target = _.sample(world.viewWalkable(vector))
            if (!target)
                return false

            this.energy = this.baseEnergy
            world.set(target, this.another())
            return true
        },
    },
})

const Plant = stampit({
    methods: {
        grow() {
            this.energy += this.growthRate
            return true
        },
        preAct(world, vector) {
            return (
                this.reproduce(world, vector) ||
                this.grow(world, vector)
            )
        },
    }
}).compose(Organism)

const Animal = stampit({
    methods: {
        eat(world, vector) {
            for (const target of world.view(vector)) {
                const thing = world.get(target)
                if (thing && this.diet.includes(thing.name)) {
                    world.remove(target)
                    this.energy += thing.energy
                    return true
                }
            }
            return false
        },
        metabolize(world, vector) {
            this.energy -= this.metabolism

            if (this.energy > 0)
                return false

            world.remove(vector)
            return true
        },
        preAct(world, vector) {
            return (
                this.reproduce(world, vector) ||
                this.metabolize(world, vector)
            )
        },
    }
}).compose(Organism)

const CanBounce = stampit({
    init() {
        if (!this.dir)
            this.dir = _.sample(directions)
    },
    methods: {
        bounce(world, vector) {
            let dest = vector.plus(this.dir)
            if (!world.isWalkable(dest)) {
                dest = _.sample(world.viewWalkable(vector))
                if (!dest)
                    return false
                this.dir = dest.minus(vector)
            }

            world.move(vector, dest)
            this.energy -= 0.8
            return true
        },
    },
})

const CanWander = stampit({
    methods: {
        wander(world, vector) {
            const dest = _.sample(world.viewWalkable(vector))
            if (!dest)
                return false

            world.move(vector, dest)
            this.energy -= 0.8
            return true
        }
    }
})

export default { Organism, Plant, Animal, CanBounce, CanWander }
