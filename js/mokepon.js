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
let rivalAttack;
let mokeponOption;
let inputSquirtle;
let inputCharmander;
let inputBulbasaur;
let mokeponPlayer;
let mokeponAttacks;
let inputFire;
let inputWater;
let inputGround;
let buttons = [];
let result;
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
    let result = Math.floor(Math.random() * (max - min + 1) + 1);
    return result;
}


//Selección Mokepon Rival
function selectMokeponRival() {
    let randomMokepon = randomNumber(0, mokepones.length - 1);

    spanMokeponRival.innerHTML = mokepones[randomMokepon].nombre;
    attackSequence();
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


//Mosstrar Botones de Ataques
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
    buttons = document.querySelectorAll(".BUTattack")
}


function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                playerAttack.push("Fire")
                console.log(playerAttack)
                button.style.background = "#112F58"
            } else if (e.target.textContent === "💧") {
                playerAttack.push("Water")
                console.log(playerAttack)
                button.style.background = "#112F58"
            } else {
                playerAttack.push("Ground")
                console.log(playerAttack)
                button.style.background = "#112F58"
            }
        })
    })
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