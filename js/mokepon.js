const sectionSelectAttack = document.getElementById("attack");
const sectionReset = document.getElementById("reset");
const buttonMokeponType = document.getElementById("button-mokepon");
const inputFire = document.getElementById("button-fire");
const inputWater = document.getElementById("button-water");
const inputGround = document.getElementById("button-ground");
const inputReset = document.getElementById("button-reset");

const sectionSelectMokepon = document.getElementById("pets");
const inputSquirtle = document.getElementById("squirtle");
const inputCharmander = document.getElementById("charmander");
const inputBulbasaur = document.getElementById("bulbasaur");
const spanMokeponPlayer = document.getElementById("mokepon-player");

const spanMokeponRival = document.getElementById("mokepon-rival");

const spanPlayerLives = document.getElementById("lives-player");
const spanRivalLives = document.getElementById("lives-rival");

const resultCombatSection = document.getElementById("result-combat");
const playerAttacksSection = document.getElementById("player-attacks");
const rivalAttacksSection = document.getElementById("rival-attacks");

let playerAttack;
let rivalAttack;
let result;
let playerLives = 3;
let rivalLives = 3;


function startGame() {
    sectionSelectAttack.style.display = "none"
    sectionReset.style.display = "none"
    buttonMokeponType.addEventListener("click", selectMokeponPlayer);
    inputFire.addEventListener("click", fireAttack);
    inputWater.addEventListener("click", waterAttack);
    inputGround.addEventListener("click", groundAttack);
    inputReset.addEventListener("click", resetGame);
}


//Función Número Aleatorio
function randomNumber(min, max) {
    let result = Math.floor(Math.random() * (max - min + 1) + 1);
    return result;
}


//Selección Mokepon Rival
function selectMokeponRival() {
    let randomMokepon = randomNumber(1,3);

    if(randomMokepon == 1) {
        spanMokeponRival.innerHTML = "Squirtle"
    }else if(randomMokepon == 2) {
        spanMokeponRival.innerHTML = "Charmander"
    }else {
        spanMokeponRival.innerHTML = "Bulbasaur"
    }
}


//Selección Mokepon Jugador
function selectMokeponPlayer() {
    sectionSelectAttack.style.display = "flex"
    sectionSelectMokepon.style.display = "none"

    if(inputSquirtle.checked == true) {
        spanMokeponPlayer.innerHTML = "Squirtle"
    }else if (inputCharmander.checked == true) {
        spanMokeponPlayer.innerHTML = "Charmander"
    }else if (inputBulbasaur.checked == true) {
        spanMokeponPlayer.innerHTML = "Bulbasaur"
    }else{
        alert("Selecciona un Mokepon")
    }

    selectMokeponRival();
}


//Funcion Ataque Fuego
function fireAttack() {
    playerAttack = "Fire 🔥"
    rivalRandomAttack()
}


//Funcion Ataque Agua
function waterAttack() {
    playerAttack = "Water 💧"
    rivalRandomAttack()
}


//Funcion Ataque Tierra
function groundAttack() {
    playerAttack = "Ground 🌱"
    rivalRandomAttack()
}


//Función Ataque Rival
function rivalRandomAttack() {
    mokeponRivalAttack = randomNumber(1,3);

    if(mokeponRivalAttack  == 1) {
        rivalAttack = "Fire 🔥"
    }else if(mokeponRivalAttack  == 2) {
        rivalAttack = "Water 💧"
    }else {
        rivalAttack = "Ground 🌱"
    }

    combat(playerAttack, rivalAttack);
}


//Function Combat
function combat(player, rival) {
    if(player == rival) {
        result = "Draw";
    }else if ((player == "Fire 🔥" && rival == "Ground 🌱") || (player == "Water 💧" && rival == "Fire 🔥") || (player == "Ground 🌱" && rival == "Water 💧")) {
        result = "⭐You Won⭐"
        rivalLives -= 1;
        spanRivalLives.innerHTML = rivalLives;
    }else{
        result = "❌You Lost❌"
        playerLives -= 1;
        spanPlayerLives.innerHTML = playerLives;
    }

    createMessage();
    checkLives()
}


//Función Añadir Texto
function createMessage() {
    let newPlayerAttack = document.createElement("p")
    let newRivalAttack = document.createElement("p")

    resultCombatSection.innerHTML = result
    newPlayerAttack.innerHTML = `Tu Mokepon ataco con ${playerAttack}`
    newRivalAttack.innerHTML = `El Mokepon rival ataco con ${rivalAttack}`

    playerAttacksSection.appendChild(newPlayerAttack)
    rivalAttacksSection.appendChild(newRivalAttack)
}


//Función Añadir Texto
function createMessageEnd(combatResult) {
    resultCombatSection.innerHTML = combatResult
    inputFire.disabled = true
    inputWater.disabled = true
    inputGround.disabled = true
    sectionReset.style.display = "block"
}


//Función Revisar Vidas
function checkLives() {
    if(rivalLives == 0) {
        createMessageEnd("⭐⭐⭐YOU WON THE DUEL⭐⭐⭐")
    }else if (playerLives == 0) {
        createMessageEnd("❌❌❌YOU LOST THE DUEL❌❌❌")
    }
}


function resetGame() {
    location.reload()
}

window.addEventListener("load", startGame);