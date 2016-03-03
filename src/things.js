import clamp from 'lodash/clamp'
import sample from 'lodash/sample'
import stampit from 'stampit'

import { directions } from './world'

const Wall = stampit({
  refs: {
    name: 'wall',
    image: '=',
    walkable: false,
  },
})

const Organism = stampit({
  refs: {
    walkable: false,
  },
  init({ stamp, args }) {
    this.another = stamp

    let energy = this.baseEnergy
    if (args[0] && 'energy' in args[0])
      energy = args[0].energy

    Reflect.defineProperty(this, 'energy', {
      get: () => energy,
      set: (x) => {
        energy = clamp(x, 0, this.maxEnergy)
      }
    })
  },
  methods: {
    reproduce(world, vector) {
      if (this.energy < this.maxEnergy)
        return false

      const target = sample(world.viewWalkable(vector))
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

const Bounce = stampit({
  init() {
    if (!this.dir)
      this.dir = sample(directions)
  },
  methods: {
    bounce(world, vector) {
      let dest = vector.plus(this.dir)
      if (!world.isWalkable(dest)) {
        dest = sample(world.viewWalkable(vector))
        if (!dest)
          return false
        this.dir = dest.minus(vector)
      }

      world.move(vector, dest)
      this.energy -= this.movementCost
      return true
    },
  },
})

const Wander = stampit({
  methods: {
    wander(world, vector) {
      const dest = sample(world.viewWalkable(vector))
      if (!dest)
        return false

      world.move(vector, dest)
      this.energy -= this.movementCost
      return true
    },
  },
})

const Hunt = stampit({
  methods: {
    hunt(world, vector) {
      const view = world.view(vector, this.senseRadius)

      const prey = view.filter(target => {
        const thing = world.get(target)
        return thing && this.diet.includes(thing.name)
      })

      if (prey.length) {
        const closest = prey.reduce((previous, current) => {
          const previousDistance = previous.minus(vector).map(Math.abs)
          const currentDistance = current.minus(vector).map(Math.abs)
          const result = currentDistance.compare(previousDistance)
          return result === -1 ? current : previous 
        })

        this.dir = closest.minus(vector).dir()
      }

      return this.bounce(world, vector)
    },
  },
}).compose(Bounce)

export default { Wall, Organism, Plant, Animal, Bounce, Wander, Hunt }
