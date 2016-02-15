EVOLVE
======

Entity
------

### Attributes

+ vitality
  - When `vitality` hits `0`, entity dies
  - Decreases over time

+ stamina
  - Each action has a stamina cost
  - Decreases when `entity` performs actions

+ speed
  - Negative correlation with `stamina`

+ intelligence
  - Affects how well an entity performs its actions

+ diet
  - herbivore
  - carnivore
  - omnivore
  - scavenger


### Actions

+ Move
+ Eat
+ Reproduce


### Default entities

+ Plant
  + Diet
    + Carnivorous
      + Energy decreases over time, but very slowly
      + Attracts smaller animals
    + Photosynthetic
      + Energy increases over time

+ Animals
  + Diet
    + Herbivore
    + Carnivore
    + Omnivore
    + Scavenger

+ Fungi
  + Diet
    + Scavenger
