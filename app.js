import parseWorld from './src/configParser'

function animateWorld(world) {
    const doc = window.document;

    const canvas = doc.createElement('pre');
    doc.body.appendChild(canvas);

    const step = () => {
        canvas.innerHTML = world.toString();
        world.turn();
    };
    window.setInterval(step, 300);
}

window.onload = () => {
    const xhr = new XMLHttpRequest()
    const url = '../src/defaultConfig.json'

    xhr.onload = () => {
        const json = JSON.parse(xhr.responseText)
        const world = parseWorld(json)
        animateWorld(world)
    }

    xhr.onerror = () => {
        throw new Error(`Failed to load ${url}: ${xhr.status}`)
    }

    xhr.open('get', url, true)
    xhr.send()
};
