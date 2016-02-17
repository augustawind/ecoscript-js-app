const ecosystem = require('./ecosystem');

function run() {
    const doc = window.document;

    const canvas = doc.createElement('pre');
    doc.body.appendChild(canvas);

    canvas.innerHTML = ecosystem.toString();

    doc.addEventListener('keydown', (event) => {
        if (event.keyCode !== 32)
            return;
        canvas.innerHTML = ecosystem.toString();
        ecosystem.turn();
    });
}

window.app = {
    run
};
