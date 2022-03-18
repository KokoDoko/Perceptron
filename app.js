import { Perceptron } from "./perceptron.js"

const btnReset = document.querySelector("#reset")
const btnTrain = document.querySelector("#start")
btnReset.addEventListener("click", () => resetTraining())
btnTrain.addEventListener("click", () => trainPerceptron())

let perceptron
resetTraining()

// ******************************************************
//
// CATS AND DOGS
//
// ******************************************************
export function resetTraining() {
    // already normalized - todo add normalization to perceptron.js !!!!
    const catdog_inputs = [[0.6, 0.3, 0.27, 0.13, 1],
                            [0.66, 0.56, 0.51, 0.33, 0],
                            [0.56, 0.3, 0.3, 0.13, 1],
                            [0.76, 0.66, 0.66, 0.41, 0],
                            [0.53, 0.3, 0.33, 0.14, 1],
                            [0.7, 0.55, 0.53, 0.22, 0]]

    const catdog_labels = [[1, 0, 1, 0, 1, 0]]
    if(perceptron) perceptron.stopAnimation()
    perceptron = new Perceptron(catdog_inputs, catdog_labels, ["Length", "Height", "Weight", "Ears", "Claws"], "Cat or Dog?")
}

export function trainPerceptron() {
    perceptron.train(100)

    // Invent some new size of cat or dog, and test it. 1 means cat, 0 means dog.
    let weird_animal = [0.6, 0.3, 0.2, 0.1, 1]
    console.log(perceptron.test(weird_animal))      // should be near 1 because cat has claws

    let weird_animaltwo = [0.9, 0.4, 0.4, 0.2, 0]
    console.log(perceptron.test(weird_animaltwo))   // should be near 0 because dog has no claws
}