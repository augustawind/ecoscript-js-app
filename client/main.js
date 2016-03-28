import ajax from 'ajax'
import ecoscript from 'ecoscript'
import forOwn from 'lodash/forOwn'
import yaml from 'js-yaml'

// Example ecosystem data files
const EXAMPLE_CONFIG = 'example.yaml'
const EXAMPLE_IMAGES = 'images.yaml'

const IMAGE_DIR = 'img/'

// Dimensions of each tile
const TILE_WIDTH = 16
const TILE_HEIGHT = 16

// Delay in milliseconds between each turn
const DELAY = 300

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
    ajax.get(EXAMPLE_IMAGES, settings, data => {
      const urls = yaml.safeLoad(data)

      // All images loaded
      loadImages(urls, images => {
        // Start simulation
        start(ctx, ecosystem, images)
      })
    })
  })
}

function start(ctx, ecosystem, images) {
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

    // Render ecosystem
    ecosystem.enumerate().forEach(({ vector, thing }) => {
      // Disable antialiasing
      ctx.imageSmoothingEnabled = false
      ctx.webkitImageSmoothingEnabled = false
      ctx.mozImageSmoothingEnabled = false

      // Draw entity if not empty
      if (thing) {
        ctx.drawImage(
          images[thing.string],
          vector.x * TILE_WIDTH, vector.y * TILE_HEIGHT,
          TILE_WIDTH, TILE_HEIGHT
        )
      }
    })

    // Turn ecosystem
    ecosystem.turn()
  }

  window.requestAnimationFrame(next)
}

function loadImages(urls, onLoad) {
  const images = {}

  forOwn(urls, (url, key) => {
    const img = new Image()

    img.onload = () => {
      images[key] = img

      // Fire callback once all images are loaded
      if (Object.keys(images).length === Object.keys(urls).length) {
        onLoad(images)
      }
    }

    img.src = IMAGE_DIR + url
  })
}
