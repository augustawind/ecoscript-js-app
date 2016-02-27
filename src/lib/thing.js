import cloneDeep from 'lodash/cloneDeep'
import validate from './validateArgs'

class Thing {

    constructor(params, expected = []) {
        expected.push('name', 'walkable', 'image')
        validate(params, expected)

        Object.assign(this, params)
        this.initialParams = params
    }

    cloneFresh() {
        const clone = cloneDeep(this)
        Object.assign(clone, this.initialParams)
        return clone
    }
}

module.exports = Thing
