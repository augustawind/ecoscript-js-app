import stampit from 'stampit'

import { World, Vector } from '../client/world'
import t from '../client/things'

describe('Organism', () => {

  describe('#energy', () => {

    it('should initially be set to baseEnergy', () => {
      const org = t.Organism({ baseEnergy: 10, maxEnergy: 20 })
      expect(org.energy).toBe(org.baseEnergy)
    })
    it('should not be able to exceed maxEnergy', () => {
      const org = t.Organism({ baseEnergy: 10, maxEnergy: 20 })
      org.energy += 100
      expect(org.energy).toBe(org.maxEnergy)
    })
    it('should not be able to drop below 0', () => {
      const org = t.Organism({ baseEnergy: 10, maxEnergy: 20 })
      org.energy -= 100
      expect(org.energy).toBe(0)
    })
    it('should otherwise behave normally', () => {
      const org = t.Organism({ baseEnergy: 10, maxEnergy: 20 })
      org.energy += 5
      expect(org.energy).toBe(15)
      org.energy -= 11
      expect(org.energy).toBe(4)
    })
  })

  describe('#reproduce', () => {

    const org = stampit({
      props: {
        baseEnergy: 20,
        maxEnergy: 20,
      },
    }).compose(t.Organism).create()
    const world = new World([
      [null, null, null],
      [null, org, null],
      [null, null, null],
    ])

    org.reproduce(world, new Vector(1, 1))

    const orgs = world.view(new Vector(1, 1))
                      .map(vector => world.get(vector))
                      .filter(th => th !== null)
    const baby = orgs[0]
  
    it('should create just one organism in an adjacent space', () => {
      expect(orgs.length).toBe(1)
    })
    it('should create the baby from the same blueprint', () => {
      expect(org.another).toBe(baby.another)
    })
    it("should set the baby's energy to its base level", () => {
      expect(baby.energy).toBe(org.baseEnergy)
    })
    it('should not remove the parent organism', () => {
      expect(world.get(new Vector(1, 1))).toBe(org)
    })
  })
})

describe('Plant', () => {

  describe('#grow', () => {

    const plant = t.Plant({ baseEnergy: 10, maxEnergy: 20, growthRate: 9 })
    const other = t.Plant({ baseEnergy: 4, maxEnergy: 11, growthRate: 5 })
    const world = new World([[plant, other]])
    
    plant.grow(world, new Vector(1, 0))

    it("should increment the plant's energy by its growthRate", () => {
      expect(plant.energy).toBe(19)
    })
    it("should not affect any other plants", () => {
      expect(other.energy).toBe(4)
    })
  })
})

describe('Animal', () => {

  describe('#metabolize', () => {

    const animal = t.Animal({ baseEnergy: 20, maxEnergy: 20, metabolism: 2 })
    animal.metabolize()
    animal.metabolize()
    animal.metabolize()

    it("should reduce the animal's energy by its metabolism", () => {
      expect(animal.energy).toBe(14)
    })
  })

  describe('#eat', () => {

    const predator = t.Animal({ name: 'predator', baseEnergy: 5, maxEnergy: 20, diet: ['prey'] })
    const Prey = () => t.Animal({ name: 'prey', baseEnergy: 3, maxEnergy: 20 })
    const prey1 = Prey()
    const prey2 = Prey()
    const other = () => t.Animal({ name: 'other', baseEnergy: 5, maxEnergy: 20 })
    const world = new World([
      [prey1, null, other],
      [null, predator, null],
      [null, null, prey2],
    ])
    predator.eat(world, new Vector(1, 1))
    const things = world.view(new Vector(1, 1))
                        .map(v => world.get(v))
                        .filter(th => th !== null)

    it("should remove one adjacent organism", () => {
      expect(things.length).toBe(2)
    })
    it("should only remove an organism that is in the Animal's diet", () => {
      const prey = things.filter(th => th.name === 'prey')
      expect(prey.length).toBe(1)
    })
    it("should add the eaten's energy to the eater's energy", () => {
      expect(predator.energy).toBe(8)
    })
  })
})

describe('Wander', () => {

  it('should only move the thing 1 space', () => {
    for (let i = 0; i < 20; i++) {
      const wanderer = t.Wander()
      const world = new World([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, wanderer, null],
      ])
      const vector = new Vector(2, 3)

      expect(world.get(vector)).toBe(wanderer)

      wanderer.wander(world, vector)

      const view = world.view(vector)
      const things = view.map(v => world.get(v))
      expect(things).toContain(wanderer)
    }
  })
})

describe('Go', () => {

  it('should only move the thing 1 space', () => {
    for (let i = 0; i < 20; i++) {
      const thing = t.Go()
      const world = new World([
        [null, null, null, null],
        [null, thing, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ])
      const vector = new Vector(1, 1)

      expect(world.get(vector)).toBe(thing)

      thing.bounce(world, vector)

      const view = world.view(vector)
      const thingView = view.map(v => world.get(v))
      expect(thingView).toContain(thing)
    }
  })
})
