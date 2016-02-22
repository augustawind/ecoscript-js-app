const Vector = require('../src/lib/vector');
const World = require('../src/lib/world');

describe('World constructor', () => {

    const makeClass = (name) => {
        return class  {
            constructor() {
                this.name = name;
            }
        };
    };

    it('should set the correct width and height', () => {
        const things = [
            [1,1,1],
            [1,1,1],
            [1,1,1],
            [1,1,1],
        ];
        const world = new World(things);

        expect(world.width).toBe(3);
        expect(world.height).toBe(4);
    });

    it('should throw an error if given a `things` array with inconsistent row lengths', () => {
        const things = [
            [1,1,1],
            [1,1],
            [1,1,1],
        ];
        const newWorld = () => new World(things);

        expect(newWorld).toThrow();
    });

    it('should place each thing in the proper position', () => {
        const A = makeClass('a');
        const B = makeClass('b');
        const C = makeClass('c');
        const D = makeClass('d');
        const things = [
            [new A(), new B()],
            [new C(), new D()],
        ];
        const world = new World(things);

        const a = world.get(new Vector(0, 0));
        const b = world.get(new Vector(1, 0));
        const c = world.get(new Vector(0, 1));
        const d = world.get(new Vector(1, 1));

        expect(a.name).toBe('a');
        expect(b.name).toBe('b');
        expect(c.name).toBe('c');
        expect(d.name).toBe('d');
    });

    describe('#fromLegend', () => {
        it('should map each key in the given keys array to an instance of its corresponding class', () => {
            const keysArray = [
                'ab',
                'cd',
            ];
            const legend = new Map([
                ['a', makeClass('a')],
                ['b', makeClass('b')],
                ['c', makeClass('c')],
                ['d', makeClass('d')],
            ]);
            const world = World.fromLegend(legend, keysArray);

            const a = world.get(new Vector(0, 0));
            const b = world.get(new Vector(1, 0));
            const c = world.get(new Vector(0, 1));
            const d = world.get(new Vector(1, 1));

            expect(a.name).toBe('a');
            expect(b.name).toBe('b');
            expect(c.name).toBe('c');
            expect(d.name).toBe('d');
        });
    });
});

describe('World', () => {

    const makeThing = (name, walkable) => {
        class Thing {
            constructor() {
                this.name = name;
                this.walkable = walkable;
            }
            act(world, vector) {
                return [world, vector];
            }
        }
        return new Thing();
    };

    let world;

    beforeEach(() => {
        world = new World([
            [makeThing('a', true ), makeThing('b', false)],
            [null                 , makeThing('d', true )],
            [makeThing('e', false), null                 ],
        ]);
    });

    afterEach(() => {
        world = undefined;
    });

    it('should let you get and set things by vector', () => {
        const a = new Vector(0, 0);
        const d = new Vector(1, 1);
        const e = new Vector(0, 2);

        expect(world.get(a).name).toBe('a');
        expect(world.get(d).name).toBe('d');
        expect(world.get(e).name).toBe('e');

        world.set(a, makeThing('new a'));
        world.set(d, makeThing('new d'));

        expect(world.get(a).name).toBe('new a');
        expect(world.get(d).name).toBe('new d');
        expect(world.get(e).name).toBe('e');
    });

    it('should let you move things from one vector to another', () => {
        const a = new Vector(0, 0);
        const d = new Vector(1, 1);

        expect(world.get(a).name).toBe('a');
        expect(world.get(d).name).toBe('d');

        world.move(a, d);

        expect(world.get(a)).toBeNull();
        expect(world.get(d).name).toBe('a');
    });

    it('should let you remove things by vector', () => {
        const a = new Vector(0, 0);
        const b = new Vector(1, 0);

        expect(world.get(a).name).toBe('a');
        expect(world.get(b).name).toBe('b');

        world.remove(a);

        expect(world.get(a)).toBeNull();
        expect(world.get(b).name).toBe('b');
    });

    describe('#isWalkable', () => {
        const a = new Vector(0, 0);
        const b = new Vector(1, 0);
        const c = new Vector(0, 1);
        const d = new Vector(1, 1);
        const e = new Vector(0, 2);
        const f = new Vector(1, 2);

        const x = new Vector(2, 0);
        const y = new Vector(0, 3);

        it('should tell you whether a thing at a vector is walkable', () => {
            expect(world.isWalkable(a)).toBe(true);
            expect(world.isWalkable(b)).toBe(false);
        });

        it('should tell you whether a vector is within the bounds of the world', () => {
            expect(world.isWalkable(x)).toBe(false);
            expect(world.isWalkable(y)).toBe(false);
        });

        it('should return `true` if there is nothing at the given vector', () => {
            expect(world.isWalkable(c)).toBe(true);
            expect(world.isWalkable(f)).toBe(true);
        });
    });
});
