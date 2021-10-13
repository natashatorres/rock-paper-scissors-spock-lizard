/*

pseudocode:
variables

functions
a class of options for bot to randomize through
method that randomizes bot's choice
conditional statemennts that compare bot's and user's choice
player object
bot object
keep track of score


event listeners
-event listeners for user's choice (rock, paper, scissors, spock, lizard)


client side:
user's choice
fetch to get bots choice

server side:
bot's choice
decision who won

*/

//variables
let choices = document.querySelectorAll('.choice')
const player1Scoreboard = document.querySelector('#player1Scoreboard');
const player2Scoreboard = document.querySelector('#player2Scoreboard');
const gamestatus = document.querySelector('h2');
// player1Scoreboard.innerHTML = "0"
// player2Scoreboard.innerHTML = "0"


let choiceArray = ["rock", "paper", "scissors", "spock", "lizard"]



// function handleClick(event){
//     const compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)]
//     console.log(compChoice)
//     console.log(event.target.id)
// }

//event listeners
// for(let i = 0; i < choices.length; i++){
//     choices[i].addEventListener('click', handleClick)
// }


//possible objects
//player 1
//comp class with randomizing method + 

class Game {

    constructor() {
        this.player = new Player()
        // this.computer = new Computer()
        this.player1Score = 0
        this.player2Score = 0
        this.updateScoreboard()
        
        this.handleClick = this.handleClick.bind(this)
        
        for (let i = 0; i < choices.length; i++) {
            choices[i].addEventListener('click', this.handleClick)
        }
    }

    incrementPlayer1Score(){
        this.player1Score += 1 
    }
    incrementPlayer2Score(){
        this.player2Score += 1
    }

    handleClick(event) {
        let playerChoice = this.player.getChoice(event)
        
        console.log("about to fetch")
        fetch(`/api?playerChoice=${playerChoice}`)
        .then(response => response.json())
        .then((data) => {
        
        let compChoice = data.computerChoice
        let winner = data.winner

        document.querySelector('h4').innerHTML = playerChoice
        document.querySelector('h3').innerHTML = compChoice


        if(winner === "player"){
            document.querySelector('h2').innerHTML = "You win!"
            this.incrementPlayer1Score()
            
        }else if(winner === "computer"){
            document.querySelector('h2').innerHTML = "You lose!"
            this.incrementPlayer2Score()
        }else{
            document.querySelector('h2').innerHTML = "Draw!"
        }
        
        this.updateScoreboard()
        console.log(data)
        console.log(playerChoice)
        console.log(compChoice)
        console.log(winner)
    })

    }

    updateScoreboard() {
        player1Scoreboard.innerHTML = this.player1Score
        player2Scoreboard.innerHTML = this.player2Score
    }

}

class Player {
    getChoice(event) {
        return event.target.id
    }
}

// class Computer {
//     //get choice
//     //fetch goes here (example of an abstraction)
//     getChoice() {
       
//         // return choiceArray[Math.floor(Math.random() * choiceArray.length)]

//     }

// }

const game = new Game()

//sources
//https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array

//what I googled:
//effieient way to compare rock, paper scissors


// if(playerChoice === compChoice){
//     console.log("draw!")
// }else if(losesOrWins[playerChoice].winsTo === compChoice){
//     console(losesO)
//     console.log("I won")
// }else if(losesOrWins[playerChoice].losesTo === compChoice){
//     console(losesO)
//     console.log("I lost")