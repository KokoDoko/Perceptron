export class PerceptronSVG {
    constructor(){
        this.ns = "http://www.w3.org/2000/svg"
        this.svg = document.getElementById('svg')
        this.weights = []
        this.inputcontents = []

        // TODO SHOW WEIGHT NUMBERS NEAR WEIGHT LINES
        // TODO FAKE SLOW TRAINING SO YOU CAN SEE CHANGES BETTER
        // TODO SVG ANIMATION DASHED LINES
    }

    clearSVG() {
        this.svg.parentNode.replaceChild(this.svg.cloneNode(false), this.svg)
        this.svg = document.getElementById('svg')
    }

    // draw inputs and outputs
    drawNodes(inputs, labels, textlabels, outputlabel) {
        this.clearSVG()
        this.weights = []

        // INPUTS WEIGHTS
        // <circle cx="200" cy="100" r="40" class="input" />
        // <text x = "150" y = "104" class="label" text - anchor="end" > Weight</text >
        // <line x1="200" x2="500" y1="100" y2="200" class="weight" id="w1" />
        let amount = inputs[0].length
        let center = ((amount -1) / 2) * 100 + 100

        for (let i = 0; i < amount; i++) {
            let y = i * 100 + 100
            // for each input, weight line to the output
            let line = document.createElementNS(this.ns, 'line')
            line.setAttributeNS(null, 'x1', 200)
            line.setAttributeNS(null, 'x2', 500)
            line.setAttributeNS(null, 'y1', y)
            line.setAttributeNS(null, 'y2', center)
            line.setAttributeNS(null, 'class', 'weight')
            this.svg.appendChild(line)
            this.weights.push(line)

            // inputs
            let circle = document.createElementNS(this.ns, 'circle')
            circle.setAttributeNS(null, 'cx', 200)
            circle.setAttributeNS(null, 'cy', y)
            circle.setAttributeNS(null, 'r', 36)
            circle.setAttributeNS(null, 'class', 'input')
            this.svg.appendChild(circle)

            // label
            let label = document.createElementNS(this.ns, 'text')
            label.setAttributeNS(null, 'x', 150)
            label.setAttributeNS(null, 'y', y+4)
            label.setAttributeNS(null, 'text-anchor', "end")
            label.setAttributeNS(null, 'class', 'label')
            let data = document.createTextNode(textlabels[i])
            label.appendChild(data)
            this.svg.appendChild(label)

            // input cell content
            let cellcontent = document.createElementNS(this.ns, 'text')
            cellcontent.setAttributeNS(null, 'x', 200)
            cellcontent.setAttributeNS(null, 'y', y + 4)
            cellcontent.setAttributeNS(null, 'text-anchor', "middle")
            cellcontent.setAttributeNS(null, 'class', 'inputcontent')
            let tdata = document.createTextNode("")
            cellcontent.appendChild(tdata)
            this.svg.appendChild(cellcontent)
            this.inputcontents.push(tdata)

        }
        // OUTPUT
        let circle = document.createElementNS(this.ns, 'circle')
        circle.setAttributeNS(null, 'cx', 500)
        circle.setAttributeNS(null, 'cy', center)
        circle.setAttributeNS(null, 'r', 36)
        circle.setAttributeNS(null, 'class', 'input')
        this.svg.appendChild(circle)
        // OUTPUTLABEL
        let label = document.createElementNS(this.ns, 'text')
        label.setAttributeNS(null, 'x', 545)
        label.setAttributeNS(null, 'y', center+4)
        label.setAttributeNS(null, 'text-anchor', "begin")
        label.setAttributeNS(null, 'class', 'label')
        let data = document.createTextNode(outputlabel)
        label.appendChild(data)
        this.svg.appendChild(label)
        
    }

    updateWeights(nn_weights, inputs, output) {
        // stroke thickness for now same as weight , might become weird with super high numbers
        for(let i = 0; i < nn_weights.length; i++) {
            let w = (nn_weights[i][0]) * 3
            
            this.weights[i].style.strokeWidth = Math.abs(w) // negative width kan niet - weer breder worden als negatief
            this.weights[i].style.stroke = (w >= 0) ? "rgba(0,230,0,0.8)" : "rgba(230,0,0,0.8)"

            // todo display one of the rows of training data in the cells
            // this.inputcontents[i].textContent = "0"
        }


    }
}