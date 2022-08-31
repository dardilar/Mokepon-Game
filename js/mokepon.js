let playerAttack;
let rivalAttack;
let result;
let playerLives = 3;
let rivalLives = 3;

function startGame() {
    let sectionSelectAttack = document.getElementById("attack");
    sectionSelectAttack.style.display = "none"

    let sectionReset = document.getElementById("reset");
    sectionReset.style.display = "none"

    let buttonMokeponType = document.getElementById("button-mokepon");
    buttonMokeponType.addEventListener("click", selectMokeponPlayer);

    let inputFire = document.getElementById("button-fire");
    inputFire.addEventListener("click", fireAttack);

    let inputWater = document.getElementById("button-water");
    inputWater.addEventListener("click", waterAttack);

    let inputGround = document.getElementById("button-ground");
    inputGround.addEventListener("click", groundAttack);

    let inputReset = document.getElementById("button-reset");
    inputReset.addEventListener("click", resetGame)
}


//Función Número Aleatorio
function randomNumber(min, max) {
    let result = Math.floor(Math.random() * (max - min + 1) + 1);
    return result;
}


//Selección Mokepon Rival
function selectMokeponRival() {
    let spanMokeponRival = document.getElementById("mokepon-rival")
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
    let sectionSelectAttack = document.getElementById("attack");
    sectionSelectAttack.style.display = "flex"

    let sectionSelectMokepon = document.getElementById("pets");
    sectionSelectMokepon.style.display = "none"

    let inputSquirtle = document.getElementById("squirtle").checked;
    let inputCharmander = document.getElementById("charmander").checked;
    let inputBulbasaur = document.getElementById("bulbasaur").checked;
    let spanMokeponPlayer = document.getElementById("mokepon-player");

    if(inputSquirtle == true) {
        spanMokeponPlayer.innerHTML = "Squirtle"
    }else if (inputCharmander == true) {
        spanMokeponPlayer.innerHTML = "Charmander"
    }else if (inputBulbasaur == true) {
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
    let spanPlayerLives = document.getElementById("lives-player");
    let spanRivalLives = document.getElementById("lives-rival");

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
    let resultCombatSection = document.getElementById("result-combat")
    let playerAttacksSection = document.getElementById("player-attacks")
    let rivalAttacksSection = document.getElementById("rival-attacks")

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
    let resultCombatSection = document.getElementById("result-combat")

    resultCombatSection.innerHTML = combatResult

    let inputFire = document.getElementById("button-fire");
    inputFire.disabled = true

    let inputWater = document.getElementById("button-water");
    inputWater.disabled = true

    let inputGround = document.getElementById("button-ground");
    inputGround.disabled = true

    let sectionReset = document.getElementById("reset");
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