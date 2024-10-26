// To play with both computer and player online
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const resultMessage = document.getElementById('result-msg');
const winnerMessage = document.getElementById('winner-msg');
const resetGameButton = document.getElementById('reset-game-btn');
const optionsContainer = document.getElementById('options-container');
const pvpContainer = document.getElementById('pvp-container');
const computerLabel = document.getElementById('computer-label');
const player2Label = document.getElementById('player2-label');

let playerScore = 0;
let computerScore = 0;
let player2Score = 0;
let gameMode = ''; 


function resetGame() {
    playerScore = 0;
    computerScore = 0;
    player2Score = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    player2ScoreDisplay.textContent = player2Score;
    resultMessage.textContent = '';
    winnerMessage.textContent = '';
    optionsContainer.style.display = 'none';
    pvpContainer.style.display = 'none';
    resetGameButton.style.display = 'none';
    computerLabel.style.display = 'none';
    player2Label.style.display = 'none';
    document.querySelector('.mode-selection').style.display = 'block';
}


function handleResult(player1Choice, player2Choice) {
    if (player1Choice === player2Choice) {
        return 'It\'s a tie!';
    } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'scissors' && player2Choice === 'paper') ||
        (player1Choice === 'paper' && player2Choice === 'rock')
    ) {
        playerScore++;
        return 'Player 1 wins this round!';
    } else {
        player2Score++;
        return 'Player 2 wins this round!';
    }
}

// Function to determine the game outcome
function checkWinner() {
    if (playerScore === 3) {
        winnerMessage.textContent = 'Player 1 is the overall winner!';
        resetGameButton.style.display = 'block';
    } else if (player2Score === 3) {
        winnerMessage.textContent = 'Player 2 is the overall winner!';
        resetGameButton.style.display = 'block';
    }
}

// Event listeners for mode selection
document.getElementById('computer-mode').addEventListener('click', () => {
    gameMode = 'computer';
    document.querySelector('.mode-selection').style.display = 'none';
    optionsContainer.style.display = 'block';
    computerLabel.style.display = 'block';
});

document.getElementById('two-player-mode').addEventListener('click', () => {
    gameMode = 'two-player';
    document.querySelector('.mode-selection').style.display = 'none';
    pvpContainer.style.display = 'block';
    player2Label.style.display = 'block';
    alert("Player 1, enter your choice (rock, paper, or scissors):");
});

// Event listeners for player selections in two-player mode
function player1Choice(player1Choice) {
    const player2Choice = prompt("Player 2, enter your choice (rock, paper, or scissors):").toLowerCase();
    if (['rock', 'paper', 'scissors'].includes(player2Choice)) {
        resultMessage.textContent = handleResult(player1Choice, player2Choice);
        checkWinner();
    } else {
        alert('Invalid choice! Please enter rock, paper, or scissors.');
    }
}

// Function to handle Player 1's choice
function selectChoice(choice) {
    alert(`Player 1 selected: ${choice}`);
    player1Choice(choice);
}

// Adding event listeners for Player 1's choices
document.getElementById('p1-rock-btn').addEventListener('click', () => selectChoice('rock'));
document.getElementById('p1-paper-btn').addEventListener('click', () => selectChoice('paper'));
document.getElementById('p1-scissors-btn').addEventListener('click', () => selectChoice('scissors'));

// Event listener for reset game button
resetGameButton.addEventListener('click', resetGame);
