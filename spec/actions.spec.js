const actions = require('../src/actions');
const World = require('../src/lib/world');
const Vector = require('../src/lib/vector');

describe('actions', () => {

    const makeThing = (name, action, walkable=false) => {
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

        it('should only move the thing 1 space', () => {
            for (let i = 0; i < 20; i++) {
                const thing1 = makeThing('thing1', actions.wander);
                const thing2 = makeThing('thing2', () => {});
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

        it('should only move the thing 1 space', () => {
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
