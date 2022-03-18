import { PerceptronSVG } from "./svg.js"

export class Perceptron {
    constructor(input, labels, textlabels, outputlabel){
        console.log("Creating perceptron")
        this.ep = document.getElementById("ep")
        this.epoch = 0

        // use transpose to transform labels from [[0,1,1,0]] to [[0],[1],[1],[0]]
        this.training_inputs = input
        this.training_labels = math.transpose(labels)

        // one random starting weight for each input, between -1 and 1 in the shape of [[0],[1],[1]]
        this.weights = []
        for(let i = 0; i < input[0].length; i++){
            this.weights.push([Math.random() * 2 - 1])
        }
        // this.weights = [[-0.16595599], [0.44064899], [-0.99977125]]
        // START
        console.log("weights before training")
        console.table(this.weights)

        // draw graphic
        this.svg = new PerceptronSVG()
        this.svg.drawNodes(input, labels, textlabels, outputlabel)
        this.svg.updateWeights(this.weights)
    }

    stopAnimation(){
        this.ep.innerText = "Epoch : 0"
        this.epochs = -1
    }

    train(epochs) {
        this.epochs = epochs
        console.log(`Training ${epochs} epochs`)

        this.trainEpoch()
    }

    trainEpoch() {
        // Generate our output end result here should become 0, 1, 1, 0
        let outputs = math.multiply(this.training_inputs, this.weights)
        outputs = outputs.map(arr => [this.sigmoid(arr[0])])

        // error is verschil tussen results en training labels 
        let error = math.subtract(this.training_labels, outputs)

        // adjustments for the weights, derivative number (high error is more adjustment)
        // PYTHON: adjustments = error * sigmoid_derivative(outputs)
        let derivatives = outputs.map(arr => [this.sigmoidDerivative(arr[0])])
        let adjustments = this.multiply(error, derivatives)

        // ADJUST WEIGHTS
        // NOTE: MULTIPLY WITH INPUTLAYER (1 OR 0) -> LESS/NO ADJUSTMENT FOR LOW INPUTS
        // PYTHON: synaptic_weights += np.dot(input_layer.T, adjustments)
        // T means Transpose. It swaps rows and columns. [[0,0,0,0]] becomes [[0],[0],[0],[0]]
        let training_inputs_T = math.transpose(this.training_inputs)
        let adjustments_times_inputs = math.multiply(training_inputs_T, adjustments)
        this.weights = this.add(this.weights, adjustments_times_inputs)

        // draw weights in svg
        this.svg.updateWeights(this.weights)
        this.ep.innerText = `Epoch: ${this.epoch} of ${this.epochs}`

        this.epoch++
        if(this.epoch < this.epochs) {
            // wait a bit so we can see the weights gradually change
            setTimeout(() => this.trainEpoch(), 100)
        } else {
            console.log("FINISHED TRAINING")
            console.log("weights after training")
            console.table(this.weights)
            console.log("outputs after training (should be similar to training labels)")
            console.table(outputs)
        }
        
    }

    // classify
    test(arr) {
        console.log("CLASSIFYING " + arr)
        return this.sigmoid(math.multiply(arr, this.weights))
    }

    // helper methods
    sigmoid(x){
        return 1 / (1 + Math.exp(-x))
    }
    sigmoidDerivative(x) {
        return x * (1 - x)
    }
    multiply(arr1, arr2) {
        return arr1.map((value, index) => [value[0] * arr2[index][0]])
    }
    add(arr1, arr2) {
        return arr1.map((value, index) => [value[0] + arr2[index][0]])
    }
}




// SHAPE
// error, output        shape: [[0], [1], [1], [0]]
// adjustment, weight   shape: [[0], [1], [0]]




