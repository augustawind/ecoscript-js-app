import ajax from 'ajax'
import ecoscript from 'ecoscript'
import forOwn from 'lodash/forOwn'
import toArray from 'lodash/toArray'
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
        const sprites = ecosystem.enumerateChars().map(({ vector, chr }) => {
          return new Sprite({
            image: images[chr],
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            x: vector.x * TILE_WIDTH,
            y: vector.y * TILE_HEIGHT,
          })
        })

        // Start simulation
        start(ctx, ecosystem, sprites)
      })
    })
  })
}

function start(ctx, ecosystem, sprites) {
  let last = 0

  const next = () => {
    window.requestAnimationFrame(next)

    // Manage animation speed
    const now = Date.now()
    if (now - last < DELAY) return

    // Reset timeclock
    last = now

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Update and render sprites
    zip(ecosystem.enumerate(), sprites).forEach(
      ([{ vector }, sprite]) => {
        sprite.x = vector.x * TILE_WIDTH
        sprite.y = vector.y * TILE_HEIGHT
        sprite.render(ctx)
      }
    )

    // Turn ecosystem
    ecosystem.turn()
  }

  window.requestAnimationFrame(next)
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
