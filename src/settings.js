export const Organism = {
    baseEnergyVariation: 4,
}

export const Wall = {
    name: 'wall',
    image: '#',
    walkable: false,
}

export const Shrub = {
    name: 'plant',
    image: '*',
    baseEnergy: 3,
    maxEnergy: 20,
    growthRate: 2,
}

export const Herbivore = {
    name: 'herbivore',
    image: 'H',
    baseEnergy: 20,
    maxEnergy: 80,
    movementCost: 0.8,
    metabolism: 0.2,
    diet: ['plant'],
}

export const Predator = {
    name: 'predator',
    image: '@',
    baseEnergy: 30,
    maxEnergy: 70,
    movementCost: 0.8,
    metabolism: 0.2,
    diet: ['herbivore'],
}
