import _ from 'lodash'
import stampit from 'stampit'

import { directions } from './lib/world'

const Organism = stampit({
    init({ stamp }) {
        this.energy = this.baseEnergy
        this.another = () => stamp()
    },
    refs: {
        walkable: false,
    },
    methods: {
        reproduce(world, vector) {
            if (this.energy < this.maxEnergy * (Math.random() + 0.8))
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
        grow(world, vector) {
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
