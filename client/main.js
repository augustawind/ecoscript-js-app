import ajax from 'ajax'
import ecoscript from 'ecoscript'
import forOwn from 'lodash/forOwn'
import yaml from 'js-yaml'
import zip from 'lodash/zip'

import Sprite from './sprite'

// Example ecosystem data files
const EXAMPLE_CONFIG = 'example.yaml'
const EXAMPLE_IMAGE_MAP = 'images.yaml'
const IMAGE_DIR = 'img/'

// Dimensions of each tile
const TILE_WIDTH = 32
const TILE_HEIGHT = 32

// Delay in milliseconds between each turn
const DELAY = 500

window.onload = () => {
  // AJAX settings
  const settings = {
    error: (xhr, status, exception) => {
      console.error(status, exception)
    }
  }

  // Load config and start simulation
  ajax.get(EXAMPLE_CONFIG, settings, (config) => {
    // Load ecosystem
    const ecosystem = ecoscript(config)

    // Create 2d context
    const canvas = document.querySelector('#ecosystem')
    const ctx = canvas.getContext('2d')

    // Set canvas width and height
    canvas.width = ecosystem.things[0].length * TILE_WIDTH
    canvas.height = ecosystem.things.length * TILE_HEIGHT

    // Queue loading images
    ajax.get(EXAMPLE_IMAGE_MAP, settings, imageMapText => {
      const urlMap = yaml.safeLoad(imageMapText)

      // All images loaded
      loadImages(urlMap.organisms, images => {
        // Create sprites
        const sprites = ecosystem.enumerate().map(({ vector, thing }) => {
          return new Sprite({
            image: thing ? images[thing.string] : images[' '],
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            x: vector.x,
            y: vector.y,
          })
        })

        // Start simulation
        mainloop(ctx, ecosystem, sprites)
      })
    })
  })
}

function mainloop(ctx, ecosystem, sprites, lastTime = Date.now()) {
  // Update and render sprites
  zip(ecosystem.enumerate(), sprites).forEach(
    ([{ vector }, sprite]) => {
      sprite.x = vector.x
      sprite.y = vector.y
      sprite.render(ctx)
    }
  )

  let now = Date.now()
  while (now - lastTime < DELAY) {
    now = Date.now()
  }

  lastTime = now
  window.requestAnimationFrame(mainloop)
}

function loadImages(urlMap, onLoad) {
  const images = {}

  forOwn(urlMap, (url, key) => {
    const img = new Image()

    img.onload = () => {
      images[key] = img

      if (Object.keys(images).length === Object.keys(urlMap).length) {
        onLoad(images)
      }
    }

    img.src = IMAGE_DIR + url
  })
}
