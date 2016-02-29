const fs = require('fs')

import forOwn from 'lodash/forOwn'
import stampit from 'stampit'

import World from '../src/world'
import things from '../src/things'

function parsePlant(config) {
    return stampit({
        refs: config.properties,
    }).compose(things.Plant)
}

function parseAnimal(config) {
    const move = config.actions.move

    let condition = 'true'
    if (typeof move === 'object' && move.condition &&
            typeof move.condition === 'string') {
        condition = move.condition.replace(/\b(w+)\b/, 'this.$1')
    }

    return stampit({
        refs: config.properties,
        methods: {
            act(world, vector) {
                return (
                    this.eat(world, vector) ||
                    eval(condition) ||
                    this[move](world, vector)
                )
            }
        }
    }).compose(things.Animal, things[`Can${move.toUpperCase}`])
}

function parseOrganisms(config) {
    const organisms = Object.create(null)
    forOwn(config.plants, (val, key) => {
        organisms[key] = parsePlant(val)
    })
    forOwn(config.animals, (val, key) => {
        organisms[key] = parseAnimal(val)
    })
    return organisms
}

function parseWorld(config) {
    const organisms = parseOrganisms(config)
    organisms.Wall = stampit({
        refs: config.Wall,
    })

    const legend = new Map(
        config.world.legend.map(([key, val]) => {
            return [key, organisms[val]]
        })
    )
    
    return World.fromLegend(legend, config.world.map)
}

const json = fs.readFileSync('./config.json', 'utf8')
const config = JSON.parse(json)

const world = parseWorld(config)
