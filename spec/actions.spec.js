const actions = require('../src/actions');
const World = require('../src/lib/world');
const Vector = require('../src/lib/vector');

describe('movement actions', () => {

    const makeThing = (name, action=(() => {}), walkable=false) => {
        class Thing {
            constructor() {
                this.name = name;
                this.walkable = walkable;
            }
            get act() {
                return action.bind(this);
            }
        }
        return new Thing();
    };

    describe('#wander', () => {

        it('should only move the actor 1 space', () => {
            for (let i = 0; i < 20; i++) {
                const thing1 = makeThing('thing1', actions.wander);
                const thing2 = makeThing('thing2');
                const things = [
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, thing2, null, null],
                    [null, null, thing1, null],
                ];
                const world = new World(things);

                const vector = new Vector(2, 3);

                expect(world.get(vector)).toBe(thing1);

                world.turn();

                const view = world.view(vector);
                const thingView = view.map(v => world.get(v));

                expect(thingView).toContain(thing1);
            }
        });
    });

    describe('#bounce', () => {

        it('should only move the actor 1 space', () => {
            for (let i = 0; i < 20; i++) {
                const thing = makeThing('thing', actions.bounce);
                const things = [
                    [null, null, null, null],
                    [null, thing, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                ];
                const world = new World(things);

                const vector = new Vector(1, 1);

                expect(world.get(vector)).toBe(thing);

                world.turn();

                const view = world.view(vector);
                const thingView = view.map(v => world.get(v));

                expect(thingView).toContain(thing);
            }
        });
    });
});

describe('actions#eat', () => {

    const makeThing = (name, energy, action=(() => {}), diet=[]) => {
        class Thing {
            constructor() {
                this.name = name;
                this.energy = energy;
                this.diet = diet;
                this.walkable = false;
            }
            get act() {
                return action.bind(this);
            }
        }
        return new Thing();
    };

    let predator, prey1, prey2, things, world;

    beforeEach(() => {
        predator = makeThing('predator', 30, actions.eat, ['prey']);
        prey1 = makeThing('prey', 20);
        prey2 = makeThing('prey', 10);
        things = [
            [null, null, null, null],
            [prey1, null, null, null],
            [null, predator, null, null],
            [null, null, prey2, null],
        ];
        world = new World(things);
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
