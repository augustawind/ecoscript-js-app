const test = require('tape');
const ecos = require('../src/ecos');

test('ecos.fromLegend', t => {
    t.plan(1);

    const legend = {
        '#': 'w',
        '.': 'f'
    };
    const keys = [
        ['#','.','#'],
        ['.','.','#'],
        ['#','#','#']
    ];

    const mapped = ecos.fromLegend(legend, keys);
    const expected = [
        ['w','f','w'],
        ['f','f','w'],
        ['w','w','w']
    ];

    t.deepEqual(mapped, expected);
});
