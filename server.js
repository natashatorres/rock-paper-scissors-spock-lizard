const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring'); //query parameters in our url
// const figlet = require('figlet') //look up NPM to make the 404 fancier

//^ these are all modules
let choiceArray = ["rock", "paper", "scissors", "spock", "lizard"]


function winner(playerChoice, compChoice) {
    if (playerChoice === "rock" && compChoice === "lizard" ||
        playerChoice === "rock" && compChoice === "scissors" ||
        playerChoice === "paper" && compChoice === "spock" ||
        playerChoice === "paper" && compChoice === "rock" ||
        playerChoice === "scissors" && compChoice === "paper" ||
        playerChoice === "scissors" && compChoice === "lizard" ||
        playerChoice === "lizard" && compChoice === "spock" ||
        playerChoice === "lizard" && compChoice === "paper" ||
        playerChoice === "spock" && compChoice === "scissors" ||
        playerChoice === "spock" && compChoice === "rock" 
        ){
        return "player"
    } else if (playerChoice === compChoice) {
        return "draw"
    } else {
        return "computer"
    }
}

const server = http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });

    } else if (page == '/api') {
        console.log("starting api")
        if ('playerChoice' in params) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                
                const computerChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)]
                const playerChoice = params['playerChoice']                
                
                const objToJson = {
                    computerChoice: computerChoice,
                    winner: winner(playerChoice, computerChoice),
                }
                res.end(JSON.stringify(objToJson));
        } else{
            console.log("didn't get player choice")
        }
    } 
    else if (page == '/img/background.png') {
        fs.readFile('img/background.png', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            res.end();
        });
    } else {
          res.write("file not found");
          res.end();
    }
});

server.listen(3000);
console.log("listening on port 3000")
