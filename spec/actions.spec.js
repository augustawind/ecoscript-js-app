const World = require('../src/lib/world');
const Vector = require('../src/lib/vector');
const Thing = require('../src/lib/thing');
const actions = require('../src/actions');

const makeThing = (name, { action = () => {}, walkable = false, baseEnergy = 0, maxEnergy = 0, diet = [], growthRate = 0 } = {}) => {
    class Thing {
        constructor() {
            this.name = name;
            this.walkable = walkable;
            this.energy = baseEnergy;
            this.diet = diet;
            this.growthRate = growthRate;
        }
        get act() {
            return action.bind(this);
        }
    }
    return new Thing();
};

describe('movement actions', () => {

    describe('#wander', () => {

        it('should only move the actor 1 space', () => {
            for (let i = 0; i < 20; i++) {
                const actor1 = makeThing('actor1', { action: actions.wander });
                const actor2 = makeThing('actor2');
                const actors = [
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, actor2, null, null],
                    [null, null, actor1, null],
                ];
                const world = new World(actors);

                const vector = new Vector(2, 3);

                expect(world.get(vector)).toBe(actor1);

                world.turn();

                const view = world.view(vector);
                const actorView = view.map(v => world.get(v));

                expect(actorView).toContain(actor1);
            }
        });
    });

    describe('#bounce', () => {

        it('should only move the actor 1 space', () => {
            for (let i = 0; i < 20; i++) {
                const actor = makeThing('actor', { action: actions.bounce });
                const actors = [
                    [null, null, null, null],
                    [null, actor, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                ];
                const world = new World(actors);

                const vector = new Vector(1, 1);

                expect(world.get(vector)).toBe(actor);

                world.turn();

                const view = world.view(vector);
                const actorView = view.map(v => world.get(v));

                expect(actorView).toContain(actor);
            }
        });
    });
});

describe('actions#eat', () => {

    let predator, prey1, prey2, actors, world;

    beforeEach(() => {
        predator = makeThing('predator', { action: actions.eat,  baseEnergy: 30, diet: ['prey'] });
        prey1 = makeThing('prey', { baseEnergy: 20 });
        prey2 = makeThing('prey', { baseEnergy: 10 });
        actors = [
            [null, null, null, null],
            [prey1, null, null, null],
            [null, predator, null, null],
            [null, null, prey2, null],
        ];
        world = new World(actors);
    });

    it("should remove one adjacent entity and add its energy to the actor's, if it is part of the actor's diet", () => {
        world.turn();

        const prey1Vector = new Vector(0, 1);
        const prey2Vector = new Vector(2, 3);

        if (world.get(prey1Vector) === null) {
            expect(world.get(prey2Vector)).toBe(prey2);
            expect(predator.energy).toBe(50);
        } else if (world.get(prey2Vector) === null) {
            expect(world.get(prey1Vector)).toBe(prey1);
            expect(predator.energy).toBe(40);
        }
    });
});

describe('actions#grow', () => {

    it("should increment the actor's energy by its `growthRate`", () => {
        const actor = makeThing('actor', { action: actions.grow, baseEnergy: 0, growthRate: 10 });
        const actors = [
            [actor, null],
            [null , null],
        ];
        const world = new World(actors);

        expect(actor.energy).toBe(0);
        world.turn();
        expect(actor.energy).toBe(10);
    });
});

describe('actions#reproduce', () => {

    it("should create a new instance of the actor in an adjacent space", () => {
        const actor = new Thing({ name: 'actor', walkable: false, image: '@' });
        actor.act = actions.reproduce.bind(actor);
        const actors = [
            [null, null, null],
            [null, actor, null],
            [null, null, null],
        ];
        const world = new World(actors);

        world.turn();

        let things = world.view(new Vector(1, 1))
                          .map(vector => world.get(vector))
                          .filter(t => t !== null)
                          .filter(t => t.constructor === actor.constructor);
        expect(things.length).toBe(1);
    });
});
