import ajax from 'ajax'
import ecoscript from 'ecoscript'

function animate(ecosystem, canvas) {
  const interval = 450

  const step = () => {
    canvas.innerHTML = ecosystem.next().value
  }

  return window.setInterval(step, interval)
}

window.onload = () => {
  const url = 'example.yml'

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

  ajax.get(url, settings, callback)
}
