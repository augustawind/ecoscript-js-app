import ajax from 'ajax'
import ecoscript from 'ecoscript'

let animation

function animate(ecosystem, canvas) {
  const interval = 450

  const step = () => {
    canvas.innerHTML = ecosystem.next().value
  }

  return window.setInterval(step, interval)
}

function startEcosystem(config) {
  const ecosystem = ecoscript(config)
  const canvas = window.document.querySelector('#ecosystem')
  window.clearInterval(animation)
  animation = animate(ecosystem, canvas)
}

window.fileUpload = event => {
  const reader = new FileReader()

  reader.onload = () => {
    startEcosystem(reader.result)
  }

  const file = event.target.files[0]
  reader.readAsText(file)
}

window.onload = () => {
  const exampleURL = 'example.yaml'

  const settings = {
    error: (xhr, status, exception) => {
      console.error(status, exception)
    }
  }

  const callback = data => {
    const ecosystem = ecoscript(data)
    const canvas = window.document.querySelector('#ecosystem')
    animate(ecosystem, canvas)
  }

  ajax.get(exampleURL, settings, startEcosystem)
}
