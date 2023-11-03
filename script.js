document.querySelector('title').textContent = "Space Fighters"

/* 
1. (Complete) Generate 6 alien ships and store in array 
2. (Complete) Show stats for human ship and 1 alien ship on screen
3. (Complete) Simulate fight
    a. (Complete) Display report of battle
    b. Create lose state if player is defeated
4. (complete) Allow player to continue fight once current alien ship is destroyed
    a. Create prompt with options
    b. Create retreat state if player retreats
5. Create new round and move in new alien ship
6. Continue until last alien ship is destroyed
    a. Create win state if player wins
*/

// Declarations
let unit = 0
let turn = 0
let round = 0
let humanstats = document.querySelector('#human-stats')
let alienStats = document.querySelector('#alien-stats')
let battleLog = document.querySelector('#full-bl')

/////////////////////////
// 1 Generate alien ships
class AlienShip {
    constructor(hull, firepower, accuracy) {
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
}

class Mothership {
    constructor() {
        this.ships = []
    }
    generateShip(hull, firepower, accuracy) {
        const newShip = new AlienShip(hull, firepower, accuracy)
        this.ships.push(newShip)
    }
    generateHull(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateFirepower(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateAccuracy(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min + 1)) + min) / 10;
    }
}

const carrier = new Mothership()
for(let i = 0; i < 6; i++) {
    carrier.generateShip(carrier.generateHull(3, 6), carrier.generateFirepower(2, 4), carrier.generateAccuracy(6, 8))
}

/////////////////////////////////////////////////////
// 2. Show stats for human and 1 alien ship on screen
class USShip {
    static hull = 20;
    static firepower = 5;
    static accuracy = 0.7
}

// Show USS Assembly Stats

let report = document.createElement('h2')
report.textContent = "Round " + (++round)
battleLog.appendChild(report)
report.style.textAlign = "Left"
// hull
const humanHull = document.createElement('p')
humanHull.textContent = "Hull: " + USShip.hull
humanstats.appendChild(humanHull)
// firepower
const humanFire = document.createElement('p')
humanFire.textContent = "Firepower: " + USShip.firepower
humanstats.appendChild(humanFire)
// accuracy
const humanAcc = document.createElement('p')
humanAcc.textContent = "Accuracy: " + USShip.accuracy
humanstats.appendChild(humanAcc)

// Show alien ship stats
// hull
const alienHull = document.createElement('p')
alienHull.textContent = "Hull: " + carrier.ships[unit].hull
alienStats.appendChild(alienHull)
// firepower
const alienFire = document.createElement('p')
alienFire.textContent = "Firepower: " + carrier.ships[unit].firepower
alienStats.appendChild(alienFire) 
// accuracy
const alienAcc = document.createElement('p')
alienAcc.textContent = "Accuracy: " + carrier.ships[unit].accuracy
alienStats.appendChild(alienAcc)


/////////////////////
// 3. Simpulate fight
// Human attack
function attack() {
    const report = document.createElement('h3')
    report.textContent = "Turn: " + (++turn)
    battleLog.appendChild(report)
    if(Math.random() <= USShip.accuracy) {
        carrier.ships[unit].hull -= USShip.firepower
        alienHull.textContent = "Hull: " + carrier.ships[unit].hull
        humanStrike(USShip.firepower)
    }
    else {
        miss()
    }

    if(carrier.ships[unit].hull > 0) {
        counter()
    }
    else {
        alienDestroyed()
    }
}
// Alien counterattack
function counter() {
    if(Math.random() < carrier.ships[unit].accuracy) {
        USShip.hull -= carrier.ships[unit].firepower
        humanHull.textContent = "Hull: " + USShip.hull
        alienStrike(carrier.ships[unit].firepower)
    }
    else {
        evade()
    }
}
// Display report of battle
function humanStrike(x) {
    let report = document.createElement('p')
    report.textContent = `You hit the alien ship for ${x} damage.`
    battleLog.appendChild(report)
}
function alienStrike(x) {
    let report = document.createElement('p')
    report.textContent = `The alien ship hit your ship for ${x} damage.`
    battleLog.appendChild(report)
}
function miss() {
    let report = document.createElement('p')
    report.textContent = "You missed."
    battleLog.appendChild(report)
}
function evade() {
    let report = document.createElement('p')
    report.textContent = "You evaded the attack of the alien ship."
    battleLog.appendChild(report)
}
function alienDestroyed() {
    let report = document.createElement('p')
    report.textContent = "You defeated the alien ship."
    battleLog.appendChild(report)
    if(unit < 6) {
        ++unit
        newRound()
    }
}
function win() {

}
function lose() {

}

// Start new round
function newRound() {
let report = document.createElement('h2')
report.textContent = "Round " + (++round)
battleLog.appendChild(report)
report.style.textAlign = "Left"
// hull
humanHull.textContent = "Hull: " + USShip.hull
// firepower
humanFire.textContent = "Firepower: " + USShip.firepower
// accuracy
humanAcc.textContent = "Accuracy: " + USShip.accuracy
// Show alien ship stats
// hull
alienHull.textContent = "Hull: " + carrier.ships[unit].hull
// firepower
alienFire.textContent = "Firepower: " + carrier.ships[unit].firepower
// accuracy
alienAcc.textContent = "Accuracy: " + carrier.ships[unit].accuracy
}

// Allow retreat