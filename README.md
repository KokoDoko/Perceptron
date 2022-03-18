# Perceptron animation

🧠 A single cell brain 

https://kokodoko.github.io/perceptron/

This code uses SVG to visualise how a `perceptron` learns. The perceptron learns what exactly distinguishes a cat from a dog, using the following data.

### Cat or dog?

| Body length | Height | Weight | Ear length |  Label |
| ----------- | ------ | ------ | ---------- |  ----- |
| 18 | 9.2 | 8.1 | 2 | 'cat' |
| 20.1 | 17 | 15.5 | 5 | 'dog' |
| 17 | 9.1 | 9 | 1.95 | 'cat' |
| 23.5 | 20 | 20 | 6.2 | 'dog' |
| 16 | 9.0 | 10 | 2.1 | 'cat' |
| 21 | 16.7 | 16 | 3.3 | 'dog' |

### Usage

You can create your own ***Perceptron SVG Animation*** with your own data

```javascript
const catdog_inputs = [[0.6, 0.3, 0.27, 0.13, 1],
                       [0.66, 0.56, 0.51, 0.33, 0],
                       [0.56, 0.3, 0.3, 0.13, 1],
                       [0.76, 0.66, 0.66, 0.41, 0],
                       [0.53, 0.3, 0.33, 0.14, 1],
                       [0.7, 0.55, 0.53, 0.22, 0]]

const catdog_labels = [[1, 0, 1, 0, 1, 0]]

const perceptron = new Perceptron(catdog_inputs, catdog_labels, ["Length", "Height", "Weight", "Ears", "Claws"], "Cat or Dog?")
```
And then start the training animation for 100 epochs

```javascript
perceptron.train(100)
```

You can classify new animals with the `test` function:

```javascript
let weird_animal = [0.6, 0.3, 0.2, 0.1, 1]
console.log(perceptron.test(weird_animal))      // should be near 1 because cat has claws

let weird_animaltwo = [0.9, 0.4, 0.4, 0.2, 0]
console.log(perceptron.test(weird_animaltwo))   // should be near 0 because dog has no claws
```

### Big thanks

- [Create a Perceptron in Javascript by Fun Fun Function](https://youtu.be/o98qlvrcqiU)