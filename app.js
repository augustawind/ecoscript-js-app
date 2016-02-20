const ecosystem = require('./src/ecosystem');

window.onload = () => {
    const doc = window.document;

    const canvas = doc.createElement('pre');
    doc.body.appendChild(canvas);

    canvas.innerHTML = ecosystem.toString();

    const step = () => {
        canvas.innerHTML = ecosystem.toString();
        ecosystem.turn();
    };
    window.setInterval(step, 300);
};
