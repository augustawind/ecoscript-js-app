const cloneDeep = require('lodash/cloneDeep');
const validate = require('./validateArgs');

class Thing {

    constructor(params, expected = []) {
        expected.push('name', 'walkable', 'image');
        validate(params, expected);

        Object.assign(this, params);
        this.initialParams = params;
    }

    cloneFresh() {
        const baby = cloneDeep(this);
        Object.assign(baby, this.initialParams);
        return baby;
    }
}

module.exports = Thing;
