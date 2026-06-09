let deckId = ''
let computerScore = 0
let playerScore = 0
let isGameOver = 0
const drawCardBtn = document.getElementById('draw-card-btn')

document.getElementById('new-deck-btn').addEventListener('click', shuffleDeck)
drawCardBtn.addEventListener('click', drawCards)

function shuffleDeck() {
    if (isGameOver) {
        location.reload()
    }
    playerScore = 0
    computerScore = 0
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
        })
        .then(drawCards)
}

function drawCards() {
    if (deckId) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('cards-container').children[0].innerHTML = `<img class="card" src=${data.cards[0].image} />`
            document.getElementById('cards-container').children[1].innerHTML = `<img class="card" src=${data.cards[1].image} />`
            document.getElementById('remaining-cards').textContent = data.remaining
            
            calculateScore(data.cards[0].value, data.cards[1].value)

            if (data.remaining == 0) {
                drawCardBtn.disabled = true
                isGameOver = 1
                if (playerScore > computerScore) {
                    drawCardBtn.textContent = 'Player Wins 🎉'
                } else if (playerScore < computerScore) {
                    drawCardBtn.textContent = 'Computer Wins 🤖'
                } else {
                    drawCardBtn.textContent = 'It\'s a tie'
                }
            } 
        })
    } else {
        shuffleDeck()
    }
}

function calculateScore(computerCardValue, playerCardValue) {
    let cardValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    if (cardValue.indexOf(computerCardValue) > cardValue.indexOf(playerCardValue)) {
        computerScore += 1
    } else if (cardValue.indexOf(computerCardValue) < cardValue.indexOf(playerCardValue)) {
        playerScore += 1
    }
    renderScore()
}

function renderScore() {
    document.getElementById('computer-score').textContent = computerScore
    document.getElementById('player-score').textContent = playerScore
}

