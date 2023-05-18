////////////////////////////////
// Global Variables Here

let win = false
let lost = false
let count = 0
let score1Val = 0
let score2Val = 0

const buttons = document.querySelectorAll(`.gameButton`)
const buttonsArray = Array.from(buttons)
let score1 = document.getElementById(`score-1`)
let score2 = document.getElementById(`score-2`)
let playAgainButton = document.getElementById(`play-again`)
let result = document.getElementById(`result`)

const buttonSFX = new Audio(`buttonSFX.mp3`)

let winConditions = []

let isWon = null

let isLost = null

let isTie = null

////////////////////////////////
// Functions For Game Logic Here

const buttonClick = (i) => {
    buttons[i].innerText = 'X'
    buttons[i].disabled = true
    buttons[i].classList.add(`select`)
    buttons[i].classList.add(`x`)
}

const compChoice = () => {
    setTimeout(()=>{
        if(winCheck() == false){
            let randNum = Math.floor(Math.random()*9);
            while(buttons[randNum].innerText !== ''){
                randNum = Math.floor(Math.random()*9);
            }
            buttons[randNum].classList.add(`select`)
            buttons[randNum].innerText = 'O'
            buttons[randNum].classList.add(`o`)
        }
        winCheck()
        scoreUpdate()
    }, 500)
}

const winCheck = () => {
    let winConditions = [
        // row
        [buttons[0].innerText, buttons[1].innerText, buttons[2].innerText],
        [buttons[3].innerText, buttons[4].innerText, buttons[5].innerText],
        [buttons[6].innerText, buttons[7].innerText, buttons[8].innerText],
        // column
        [buttons[0].innerText, buttons[3].innerText, buttons[6].innerText],
        [buttons[1].innerText, buttons[4].innerText, buttons[7].innerText],
        [buttons[2].innerText, buttons[5].innerText, buttons[8].innerText],
        // diagonal
        [buttons[0].innerText, buttons[4].innerText, buttons[8].innerText],
        [buttons[2].innerText, buttons[4].innerText, buttons[6].innerText]
    ]

    let isWon = winConditions.some(line => {
        return line.every(i => {
            return i == line[0] && i != '' && line[0] == 'X'
        })
    })

    let isLost = winConditions.some(line => {
        return line.every(i => {
            return i == line[0] && i != '' && line[0] == 'O'
        })
    })

   
    const isTie = () => {
        if (isLost == false && isWon == false){
            return buttonsArray.every(button => button.innerText !== '')
        }
    }

    if (isLost == true){
        win = false 
        lost = true
        buttonDisable()
        playAgainShow()
        resultUpdate(`You lost!`)
        return true
    } else if (isWon == true) {
        win = true
        lost = false
        buttonDisable()
        playAgainShow()
        resultUpdate(`You won!`)
        return true
    } else if (isTie() == true){
        lost = false
        win = false
        buttonDisable()
        playAgainShow()
        resultUpdate(`You tied!`)
        return true
    } else{
        return false
    }
}

const scoreUpdate = () => {
    if (lost == true){
        score2Val += 1
        score2.innerText = score2Val
    } else if (win == true){
        score1Val += 1
        score1.innerText = score1Val
    }
}

const resultUpdate = (text) =>{
    result.classList.add(`select`)
    result.innerText = `${text}`
}

const replay = () => {
        for (let i = 0; i < buttons.length; i++){
            buttons[i].innerText = ''
            buttons[i].classList.remove(`select`)
            buttons[i].classList.remove(`x`)
            buttons[i].classList.remove('o')
        }
        result.classList.remove(`select`)
        playAgainClear()
        lost = false
        win = false
    }

const playAgainShow = () =>{
    playAgainButton.classList.add(`select`)
    playAgainButton.disabled = false
    playAgainButton.style.opacity = 1
}

const playAgainClear = () => {
    playAgainButton.classList.remove(`select`)
    playAgainButton.disabled = true
    playAgainButton.style.opacity = 0
}

const buttonDisable = () => {
    buttons.forEach(i => i.disabled = true)
}

const buttonEnable = () => {
    buttons.forEach(i => i.disabled = false)
}


////////////////////////////////
// Event Listeners Here

for (let i = 0; i < buttons.length; i++){
    console.log(i)
    buttons[i].addEventListener('click', () => {
        buttonClick(i)
        compChoice()
        buttonSFX.play()
    })
}

playAgainButton.addEventListener(`click`, () => {
    buttonSFX.play()
    result.innerText = ``
    buttonEnable()
    replay()
})
