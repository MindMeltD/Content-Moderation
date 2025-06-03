import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';

// The minimum prediction confidence.
const threshold = 0.9;

// Load the model. Users optionally pass in a threshold and an array of
// labels to filter the predictions.

// Patch fetch before loading the model

var modelPromise: Promise<toxicity.ToxicityClassifier> | null = loadModel(null);

function loadModel(modelPromise: Promise<toxicity.ToxicityClassifier> | null) {
    if (!modelPromise) {
        modelPromise = toxicity.load(threshold, ["identity_attack", "insult", "obscene", "severe_toxicity", "sexual_explicit", "threat", "toxicity"]);
    }
    return modelPromise;
}

async function classifyText(sentences: string[]) {
    // Load the model with the specified threshold and labels.
    const model = await loadModel(modelPromise);
    const predictions = await model.classify(sentences);
    return predictions;
}

export default {
    classifyText
};