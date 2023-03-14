var tl = gsap.timeline();
var selectedItem = ""
var cpuSelection = ""
var playerPoints = 0
var cpuPoints = 0
var displayPlayerPoints = document.getElementById("player-points")
var displaycpuPoints = document.getElementById('cpu-points')
tl.to('header', { duration: 3, y: '-155%' }, 2)
    .to('main', { duration: 0.5, opacity: 1 });


function select(selection) {
    console.log(selection)
    let rock = document.getElementById('rock')
    let paper = document.getElementById('paper')
    let scissors = document.getElementById('scissors')

    switch (selection) {
        case 'rock':
            selectedItem = "rock"
            rock.style.opacity = 1
            paper.style.opacity = 0.4
            scissors.style.opacity = 0.4
            break;
        case 'paper':
            selectedItem = "paper"
            paper.style.opacity = 1
            scissors.style.opacity = 0.4
            rock.style.opacity = 0.4
            break;
        case 'scissors':
            selectedItem = "scissors"
            scissors.style.opacity = 1
            paper.style.opacity = 0.4
            rock.style.opacity = 0.4
            break;
    }
}

function battle() {
    if (selectedItem === "") {

    }
    else {

        let x = Math.floor(Math.random() * 3)
        console.log(x)
        switch (x) {
            case 0:
                cpuSelection = "rock"
                break;
            case 1:
                cpuSelection = "paper"
                break;
            case 2:
                cpuSelection = "scissors"
                break;
        }
        console.log("The computer selected " + cpuSelection)
        if (cpuSelection === selectedItem) {
            console.log("You tied!")
        }

        else if (selectedItem === "rock") {
            if (cpuSelection === "paper") {
                console.log("The computer wins!  Paper beats rock.")
                cpuPoints += 1

            }
            else {
                console.log("You win!")
                playerPoints += 1
            }
        }

        else if (selectedItem === "paper") {
            if (cpuSelection === "scissors") {
                console.log("Scissors beats paper.  Computer wins!")
                cpuPoints += 1
            }
            else {
                console.log("You win!")
                playerPoints += 1
            }
        }

        else {
            if (cpuSelection === "rock") {
                console.log("Rock beats scissors.  Computer wins!")
                cpuPoints += 1
            }
            else {
                console.log("You win!")
                playerPoints += 1
            }

        }
        displayPlayerPoints.innerHTML = playerPoints
        displaycpuPoints.innerHTML = cpuPoints
    }

}