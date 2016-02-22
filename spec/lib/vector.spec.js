const Vector = require('../../src/lib/vector');

describe('Vector', () => {

    let a, b, c, d;
    beforeEach(() => {
        a = new Vector(1, 3);
        b = new Vector(5, 1);
        c = new Vector(0, -2);
        d = new Vector(-4, 0);
    });
    
    it('should store an x and a y value', () => {
        expect(a.x).toBe(1);
        expect(a.y).toBe(3);
        expect(c.x).toBe(0);
        expect(c.y).toBe(-2);
    });

    describe('#plus', () => {

        it('should add two vectors', () => {
            expect(a.plus(b)).toEqual(new Vector(6, 4));
            expect(b.plus(d)).toEqual(new Vector(1, 1));
        });
    });

    describe('#minus', () => {

        it('should subtract two vectors', () => {
            expect(a.minus(b)).toEqual(new Vector(-4, 2));
            expect(b.minus(d)).toEqual(new Vector(9, 1));
        });
    });
});

