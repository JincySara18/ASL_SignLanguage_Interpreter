const MODEL_URL = "./tm-my-image-modelS/";

let model, webcam, maxPredictions;

async function init() {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    prediction.sort((a, b) => b.probability - a.probability);
    document.getElementById("output").innerText = prediction[0].className;
}

init();