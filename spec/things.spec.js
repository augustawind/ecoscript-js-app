import { World, Vector } from '../src/world'
import t from '../src/things'

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

        const org = t.Organism({ baseEnergy: 20, maxEnergy: 20 })
        const world = new World([
            [null, null, null],
            [null, org, null],
            [null, null, null],
        ])

        org.reproduce(world, Vector(1, 1))

        const orgs = world.view(Vector(1, 1))
                          .map(vector => world.get(vector))
                          .filter(th => th !== null)
    
        it('should create a just one organism in an adjacent space', () => {
            expect(orgs.length).toBe(1)
        })
        it('should create the baby from the same blueprint', () => {
            const baby = orgs[0]
            expect(org.another).toBe(baby.another)
        })
        it('should not remove the parent organism', () => {
            expect(world.get(Vector(1, 1))).toBe(org)
        })
    })
})

describe('Plant', () => {

    describe('#grow', () => {

        const plant = t.Plant({ baseEnergy: 10, maxEnergy: 20, growthRate: 9 })
        const other = t.Plant({ baseEnergy: 4, maxEnergy: 11, growthRate: 5 })
        const world = new World([[plant, other]])
        
        plant.grow(world, Vector(1, 0))

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
        predator.eat(world, Vector(1, 1))
        const things = world.view(Vector(1, 1))
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

describe('CanWander', () => {

    it('should only move the thing 1 space', () => {
        for (let i = 0; i < 20; i++) {
            const wanderer = t.CanWander()
            const world = new World([
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, wanderer, null],
            ])
            const vector = Vector(2, 3)

            expect(world.get(vector)).toBe(wanderer)

            wanderer.wander(world, vector)

            const view = world.view(vector)
            const things = view.map(v => world.get(v))
            expect(things).toContain(wanderer)
        }
    })
})

describe('CanBounce', () => {

    it('should only move the thing 1 space', () => {
        for (let i = 0; i < 20; i++) {
            const thing = t.CanBounce()
            const world = new World([
                [null, null, null, null],
                [null, thing, null, null],
                [null, null, null, null],
                [null, null, null, null],
            ])
            const vector = Vector(1, 1)

            expect(world.get(vector)).toBe(thing)

            thing.bounce(world, vector)

            const view = world.view(vector)
            const thingView = view.map(v => world.get(v))
            expect(thingView).toContain(thing)
        }
    })
})
