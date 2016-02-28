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
        }
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
            const rate = Math.round(this.maxEnergy * (this.metabolism / 100))
            this.energy -= rate

            if (this.energy <= 0) {
                world.remove(vector)
                return true
            }

            return false
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
            return true
        },
    },
})

const CanWander = stampit({
    methods: {
        wander(world, vector) {
            const dest = _.sample(world.viewWalkable(vector))
            if (dest) {
                world.move(vector, dest)
                return true
            }
            return false
        }
    }
})

export default { Organism, Plant, Animal, CanBounce, CanWander }
