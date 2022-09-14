const sectionSelectAttack = document.getElementById("attack");
const sectionReset = document.getElementById("reset");
const buttonMokeponType = document.getElementById("button-mokepon");
const inputReset = document.getElementById("button-reset");

const sectionSelectMokepon = document.getElementById("pets");
const spanMokeponPlayer = document.getElementById("mokepon-player");

const spanMokeponRival = document.getElementById("mokepon-rival");

const spanPlayerLives = document.getElementById("lives-player");
const spanRivalLives = document.getElementById("lives-rival");

const resultCombatSection = document.getElementById("result-combat");
const playerAttacksSection = document.getElementById("player-attacks");
const rivalAttacksSection = document.getElementById("rival-attacks");
const cardsContainer = document.getElementById("cardsContainer");
const attacksContainer = document.getElementById("attacksContainer");

let mokepones = [];
let playerAttack = [];
let rivalAttack = [];
let mokeponOption;
let inputSquirtle;
let inputCharmander;
let inputBulbasaur;
let mokeponPlayer;
let mokeponAttacks;
let mokeponRivalAttack;
let inputFire;
let inputWater;
let inputGround;
let buttons = [];
let indexPlayerAttack;
let indexRivalAttack;
let result;
let victoryPlayer = 0;
let victoryRival = 0;
let playerLives = 3;
let rivalLives = 3;


//Clase Mokepon
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
    }
}


//Objeto squirtle
let squirtle = new Mokepon('Squirtle', './assets/img/squirtle.png', 3);
let charmander = new Mokepon('Charmander', './assets/img/charmander.png', 3);
let bulbasaur = new Mokepon('Bulbasaur', './assets/img/bulbasaur.png', 3);

squirtle.ataques.push(
    //Objetos Literales
    {nombre: '💧', id: 'button-water'}, 
    {nombre: '💧', id: 'button-water'}, 
    {nombre: '💧', id: 'button-water'}, 
    {nombre: '🔥', id: 'button-fire'}, 
    {nombre: '🌱', id: 'button-ground'}, 
)

charmander.ataques.push(
    //Objetos Literales
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '🌱', id: 'button-ground'},
)

bulbasaur.ataques.push(
    //Objetos Literales
    {nombre: '🌱', id: 'button-ground'},
    {nombre: '🌱', id: 'button-ground'},
    {nombre: '🌱', id: 'button-ground'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '🔥', id: 'button-fire'},
)

mokepones.push(squirtle, charmander, bulbasaur);


function startGame() {
    sectionSelectAttack.style.display = "none"
    sectionReset.style.display = "none"

    mokepones.forEach((mokepon) => {
        mokeponOption = `
        <input type="radio" id="${mokepon.nombre}" name="mokepon">
        <label class="pokemon-card" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `

        cardsContainer.innerHTML += mokeponOption

        inputSquirtle = document.getElementById("Squirtle");
        inputCharmander = document.getElementById("Charmander");
        inputBulbasaur = document.getElementById("Bulbasaur");
    })

    buttonMokeponType.addEventListener("click", selectMokeponPlayer);
    inputReset.addEventListener("click", resetGame);
}


//Función Número Aleatorio
function randomNumber(min, max) {
    let result = Math.floor(Math.random() * (max - min + 1) + 0);
    return result;
}


//Selección Mokepon Jugador
function selectMokeponPlayer() {
    sectionSelectAttack.style.display = "flex"
    sectionSelectMokepon.style.display = "none"

    if(inputSquirtle.checked == true) {
        spanMokeponPlayer.innerHTML = inputSquirtle.id
        mokeponPlayer = inputSquirtle.id
    }else if (inputCharmander.checked == true) {
        spanMokeponPlayer.innerHTML = inputCharmander.id
        mokeponPlayer = inputCharmander.id
    }else if (inputBulbasaur.checked == true) {
        spanMokeponPlayer.innerHTML = inputBulbasaur.id
        mokeponPlayer = inputBulbasaur.id
    }else{
        alert("Selecciona un Mokepon")
    }

    extractAttacks(mokeponPlayer);
    selectMokeponRival();
}


//Extraer Ataques Mokepones
function extractAttacks(mokeponPlayer) {
    let attacks;
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponPlayer === mokepones[i].nombre) {
            attacks = mokepones[i].ataques
        }
        
    }
    showAttacks(attacks);
}


//Mostrar Botones de Ataques
function showAttacks(attacks) {
    attacks.forEach((ataque) => {
        mokeponAttacks = `
        <button id="${ataque.id}" class="button-attack BUTattack">${ataque.nombre}</button>
        `
        attacksContainer.innerHTML += mokeponAttacks

    })

    inputFire = document.getElementById("button-fire");
    inputWater = document.getElementById("button-water");
    inputGround = document.getElementById("button-ground");
    buttons = document.querySelectorAll(".BUTattack");
}


function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                playerAttack.push("Fire 🔥")
                console.log(playerAttack)
                button.style.background = "#112F58"
                button.disabled = true
            } else if (e.target.textContent === "💧") {
                playerAttack.push("Water 💧")
                console.log(playerAttack)
                button.style.background = "#112F58"
                button.disabled = true
            } else {
                playerAttack.push("Ground 🌱")
                console.log(playerAttack)
                button.style.background = "#112F58"
                button.disabled = true
            }
            rivalRandomAttack()
        })
    })
}


//Selección Mokepon Rival
function selectMokeponRival() {
    let randomMokepon = randomNumber(0, mokepones.length - 1);
    console.log(randomMokepon)

    spanMokeponRival.innerHTML = mokepones[randomMokepon].nombre;
    mokeponRivalAttack = mokepones[randomMokepon].ataques;
    attackSequence();
}


//Función Ataque Rival
function rivalRandomAttack() {
    mokeponRivalAttack = randomNumber(0, mokeponRivalAttack.length - 1);

    if(mokeponRivalAttack  == 0 || mokeponRivalAttack == 1) {
        rivalAttack.push("Fire 🔥")
    }else if(mokeponRivalAttack  == 3 || mokeponRivalAttack == 4) {
        rivalAttack.push("Water 💧")
    }else {
        rivalAttack.push("Ground 🌱")
    }
    console.log(rivalAttack)
    startFight()
}


function startFight() {
    if (rivalAttack.length == 5) {
        combat()
    }
}


function indexBothOponents(player, rival) {
    indexPlayerAttack = playerAttack[player];
    indexRivalAttack = rivalAttack[rival];
}


//Function Combat
function combat() {

    for (let i = 0; i < playerAttack.length; i++) {
        if (playerAttack[i] === rivalAttack[i]) {
            indexBothOponents(i, i)
            result = "Draw";
        }else if ((playerAttack[i] == "Fire 🔥" && rivalAttack[i] == "Ground 🌱") || (playerAttack[i] == "Water 💧" && rivalAttack[i] == "Fire 🔥") || (playerAttack[i] == "Ground 🌱" && rivalAttack[i] == "Water 💧")) {
            indexBothOponents(i, i)
            result = "⭐You Won⭐"
            victoryPlayer += 1
            spanPlayerLives.innerHTML = victoryPlayer
        }else {
            indexBothOponents(i, i)
            result = "❌You Lost❌"
            victoryRival += 1
            spanRivalLives.innerHTML = victoryRival
        }
        createMessage()
    }

    checkVictory()
}


//Función Añadir Texto
function createMessage() {
    let newPlayerAttack = document.createElement("p")
    let newRivalAttack = document.createElement("p")

    resultCombatSection.innerHTML = result
    newPlayerAttack.innerHTML = `Tu Mokepon ataco con ${indexPlayerAttack}`
    newRivalAttack.innerHTML = `El Mokepon rival ataco con ${indexRivalAttack}`

    playerAttacksSection.appendChild(newPlayerAttack)
    rivalAttacksSection.appendChild(newRivalAttack)
}


//Función Añadir Texto
function createMessageEnd(combatResult) {
    resultCombatSection.innerHTML = combatResult
    sectionReset.style.display = "block"
}


//Función Revisar Vidas
function checkVictory() {
    if(victoryPlayer == victoryRival) {
        createMessageEnd("🎭🎭🎭DRAW🎭🎭🎭") 
    }else if (victoryPlayer > victoryRival) {
        createMessageEnd("⭐⭐⭐YOU WON THE DUEL⭐⭐⭐")
    }else {
        createMessageEnd("❌❌❌YOU LOST THE DUEL❌❌❌")
    }
}


function resetGame() {
    location.reload()
}

window.addEventListener("load", startGame);