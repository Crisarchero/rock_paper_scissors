//Initializing animation values.
let tl = gsap.timeline();
let showdownTl = gsap.timeline()
let restartTl = gsap.timeline()

//Audio variables.

let clickSound = new Audio('sounds/softClick.mp3')
let goClick = new Audio('sounds/goClick.mp3')
let lossSound = new Audio('sounds/loss.mp3')
let victorySound = new Audio('sounds/victory.mp3')



//Grabbing html elements.
let displayPlayerPoints = document.getElementById("player-points")
let displaycpuPoints = document.getElementById('cpu-points')
let play = document.getElementById('play-button')
let selectMenu = document.getElementById('select-menu')
let showdownScreen = document.getElementById('showdown')
let matchResults = document.getElementById('match-results')
let resultsScreen = document.getElementById('results')
let selectedImg = document.getElementById('player-choice')
let cpuImg = document.getElementById('cpu-choice')

//Initializing values.
let selectedItem = ""
let cpuSelection = ""
let playerPoints = 0
let cpuPoints = 0
play.addEventListener("click", battle)

//The beginning animation
tl.to('header', { duration: 3, y: '-155%' }, 2)
    .to('main', { duration: 0.5, opacity: 1 })
    .set('header', {visibility:'hidden'});

gsap.to('.pulse',
    {
        duration: 1.5,
        boxShadow: '0px 0px 15px #d500ff inset, 0px 0px 15px #d500ff',
        repeat: -1, yoyo: true
    })

gsap.to('.greater-pulse',
    {
        duration: 1.8,
        boxShadow: '0px 0px 30px #d500ff inset, 0px 0px 30px #d500ff',
        repeat: -1, yoyo: true, delay:0.5
    })

function select(selection) {
    clickSound.play()
    let rock = document.getElementById('rock')
    let paper = document.getElementById('paper')
    let scissors = document.getElementById('scissors')
    
    switch (selection) {//Finding what the player selected.
        case 'rock':
            selectedItem = "rock"
            selectedImg.src = "images/rock.png"
            rock.classList.add("selected")
            rock.classList.remove("unselected")
            paper.classList.add("unselected")
            scissors.classList.add("unselected")
            break;
        case 'paper':
            selectedItem = "paper"
            selectedImg.src = "images/paper.png"
            paper.classList.add("selected")
            paper.classList.remove("unselected")
            rock.classList.add("unselected")
            scissors.classList.add("unselected")
            break;
        case 'scissors':
            selectedItem = "scissors"
            selectedImg.src = "images/scissors.png"
            scissors.classList.add("selected")
            scissors.classList.remove("unselected")
            rock.classList.add("unselected")
            paper.classList.add("unselected")
            break;
    }
}

function battle() {
    
    if (selectedItem === "") {

    }
    else {
        goClick.play()
        play.removeEventListener("click", battle)
        play.style.visibility = "hidden"

        let x = Math.floor(Math.random() * 3)//Choosing the cpu's selection.

        //Evaluating the cpu's selection.
        switch (x) {
            case 0:
                cpuSelection = "rock"
                cpuImg.src = 'images/rock.png'
                break;
            case 1:
                cpuSelection = "paper"
                cpuImg.src = 'images/paper.png'

                break;
            case 2:
                cpuSelection = "scissors"
                cpuImg.src = 'images/scissors.png'
                break;
        }

        //Calculating the winner.
        if (cpuSelection === selectedItem) {
            matchResults.innerHTML = "You tied!"
        } else if (selectedItem === "rock") {
            if (cpuSelection === "paper") {
                matchResults.innerHTML = "You lost."
                cpuPoints += 1

            }
            else {
                matchResults.innerHTML = ("You win!")
                playerPoints += 1
            }
        } else if (selectedItem === "paper") {
            if (cpuSelection === "scissors") {
                matchResults.innerHTML = ("You lost.")
                cpuPoints += 1
            }
            else {
                matchResults.innerHTML = ("You win!")
                playerPoints += 1
            }
        } else {
            if (cpuSelection === "rock") {
                matchResults.innerHTML = ("You lost.")
                cpuPoints += 1
            }
            else {
                matchResults.innerHTML = ("You win!")
                playerPoints += 1
            }
        }

        //Displaying the results.
        showdownTl.to('#select-menu', { duration: 1, opacity: 0 })
            .set('#select-menu', { y: '-200%' })
            .to('#showdown', { duration: 1, opacity: 1 })
            .to('#showdown', { duration: 1, opacity: 0, delay: 3 })
            .set('#showdown', { y: '-200%' })
            .to('#results', {
                duration: 1, opacity: 1, oncomplete: function () {

                    if(matchResults.innerHTML === 'You win!'){
                        victorySound.play()
                    }
                    else if(matchResults.innerHTML === "You lost."){
                        lossSound.play()
                    }
                    //Display points
                    displayPlayerPoints.innerHTML = playerPoints
                    displaycpuPoints.innerHTML = cpuPoints
                    //Prepare to restart.
                    play.innerHTML = "Again?"
                    play.addEventListener("click", again)
                    play.style.visibility = "visible"
                }
            })

    }

}

function again() {
    goClick.play()
    play.style.visibility = "hidden"
    play.innerHTML = "Shoot!"
    selectedItem = ""
    scissors.classList.remove("selected", "unselected")
    paper.classList.remove("selected", "unselected")
    rock.classList.remove("selected", "unselected")


    play.removeEventListener("click", again)

    restartTl.to('#results', { duration: 1, opacity: 0 })
        .to('#select-menu', { duration: 0.1, y: '0%' })
        .to('#select-menu', { duration: 1, opacity: 1 })
        .to('#showdown', {
            duration: 0.1, y: '0%', oncomplete: function () {
                play.removeEventListener("click", again)
                play.addEventListener("click", battle)
                play.style.visibility = "visible"
            }
        })




}