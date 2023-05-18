// initalizing global variables

const buttonsDiv = document.getElementById(`buttons-container`)
const digitsDiv = document.getElementById(`digits-container`)
const operDiv = document.getElementById(`operators-container`)
const screenText = document.getElementById(`screen-text`)
const clearButton = document.createElement(`button`)
digits =[]
operators = []


// creating digit buttons


for (let i =0; i <= 10; i++){
    const digitButton = document.createElement(`button`)
    digitButton.classList.add(`digitButton`)
    // digitsDiv.appendChild(digitButton)
    if ((i) % 3 == 0){
        digitsDiv.appendChild(document.createElement(`br`))
    }
    if (i == 10){
        digitButton.innerHTML = 0 
        digitButton.setAttribute(`id`, `digit-0`)
        digitsDiv.appendChild(digitButton)
    } else if (i == 9){
        clearButton.innerText = `AC`
        digitsDiv.appendChild(clearButton)
    } else {
        digitButton.innerHTML = i+1
        digitButton.setAttribute(`id`, `digit-${i+1}`)
        digitsDiv.appendChild(digitButton)
    }
    
    digitButton.addEventListener(`click`, ()=> {
        calcType(digitButton.innerHTML)
    })
    digits.push(digitButton)
}

const addButton = document.createElement(`button`)
addButton.classList.add(`operButton`)
addButton.innerHTML = `+`

const subButton = document.createElement(`button`)
subButton.classList.add(`operButton`)
subButton.innerHTML = `-`

const multButton = document.createElement(`button`)
multButton.classList.add(`operButton`)
multButton.innerHTML = `*`

const divButton = document.createElement(`button`)
divButton.classList.add(`operButton`)
divButton.innerHTML = `/`

const equalButton = document.createElement(`button`)
equalButton.classList.add(`operButton`)
equalButton.innerHTML = `=`

operators.push(addButton, subButton, multButton, divButton, equalButton)
console.log(operators)

for (let i = 0; i < 4; i++){
    operators[i].addEventListener(`click`, ()=>{
        calcType(operators[i].innerHTML)
    })
}


operDiv.appendChild(addButton)
operDiv.appendChild(subButton)
operDiv.appendChild(multButton)
operDiv.appendChild(divButton)

digitsDiv.appendChild(equalButton)

equalButton.addEventListener(`click`, ()=> {
    if (screenText.innerHTML != null){
        const result = eval(screenText.innerHTML)
        screenText.innerHTML = result
    } else {
        screenText.innerHTML = ``
    }
})

clearButton.addEventListener(`click`, () => {
    clearScreen()
})


// functions

const calcType = (input) => {
    screenText.innerHTML = (screenText.innerHTML + input)
}

const clearScreen = ()=> {
    screenText.innerHTML = null
}
