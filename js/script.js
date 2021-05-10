let inputDir = { x: 0, y: 0 }
const moveSound = new Audio("direction2.wav")
const gameOver = new Audio("game_over2.wav")
const foodSound = new Audio("eat.wav")
const musicSound = new Audio("bg2.wav")

let board = document.getElementById("board")
let scoreboard = document.getElementById('score')
let a = 1
let b = 18
let score = 0
let speed = 10
let previousTime = 0
// let speed = prompt("Enter level no you want to play.Choose Level above 10 for more fun")
let snakeArr = [{
    x: 13, y: 15
}]
let foodArr = {
    x: 3, y: 5
}
let stone = { x: 14, y: 5 }
function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - previousTime) / 1000 < 1 / speed) {
        return
    }
    previousTime = ctime
    gameEngine()
}

function isCollide(snakeArr) {
    // bumping into itself
    for (let index = 1; index < snakeArr.length; index++) {
        if (snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y) {
            return true
        }
    }
    // colliding wall
    if (snakeArr[0].x < 0 || snakeArr[0].x > 18 || snakeArr[0].y > 18 || snakeArr[0].y < 0) {
        return true
    }
    if (snakeArr[0].x === stone.x && snakeArr[0].y === stone.y) {
        return true
    }

}
function gameEngine() {
    // musicSound.play()

    if (isCollide(snakeArr)) {
        gameOver.play()
        // musicSound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game Over,Press any key to try again")
        foodArr = { x: 3, y: 5 }
        snakeArr = [{
            x: 13, y: 15
        }]
        stone = { x: 14, y: 5 }
        score = 0
        scoreboard.innerHTML = score
        // musicSound.play()
    }

    // Updating snake array food array

    if (snakeArr[0].y === foodArr.y && snakeArr[0].x === foodArr.x) {
        // snakeArr.push({ x: foodArr.x, y: foodArr.y })
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        // console.log(foodArr)
        // x_new = Math.ceil(Math.random() * 18)
        // y_new = Math.ceil(Math.random() * 18)
        // foodArr.shift()
        // foodArr.push({ x: x_new, y: y_new })
        let a = 1
        let b = 18
        foodArr = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        stone = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score += 1
        if (score > hiscorevall) {
            hiscorevall = score
            localStorage.setItem("hiscore", JSON.stringify(hiscorevall))
            highscoreBox.innerHTML = "High Score  " + hiscorevall
        }
        scoreboard.innerHTML = "Score :" + score
        // scoreboard.innerHTML+=""

    }
    // Moving Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    // console.log(inputDir)
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y


    // Display snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add("head")
        } else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })

    // Display food

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = foodArr.y
    foodElement.style.gridColumnStart = foodArr.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)

    stoneElement = document.createElement("div")
    stoneElement.style.gridRowStart = stone.y
    stoneElement.style.gridColumnStart = stone.x
    stoneElement.classList.add("stone")
    board.appendChild(stoneElement)

}
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    let hiscorevall = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscorevall))
} else {
    hiscorevall = JSON.parse(hiscore)
    highscoreBox.innerHTML = "High Score  " + hiscorevall
}

window.requestAnimationFrame(main)

window.addEventListener("keydown", event => {
    console.log("played")
    inputDir = { x: 0, y: 0 }
    moveSound.play()
    switch (event.key) {
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;

        case "ArrowRight":
            inputDir.x = +1
            inputDir.y = 0
            console.log("ArrowRight")
            break;

        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = - 1
            console.log("ArrowUp")
            break;

        case "ArrowDown":
            inputDir.x = 0
            inputDir.y = +1
            console.log("ArrowDown")
            break;

    }
})
