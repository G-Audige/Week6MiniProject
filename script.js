document.querySelector('title').textContent = "Space Fighters"

/* 
1. (Complete) Generate 6 alien ships and store in array 
2. (Complete) Show stats for human ship and 1 alien ship on screen
3. (Complete) Simulate fight
    a. (Complete) Display report of battle
    b. (Complete) Create lose state if player is defeated
4. (complete) Allow player to continue fight once current alien ship is destroyed
    a. (Complete) Create prompt with options
    b. (Complete) Create retreat state if player retreats
5. (complete) Create new round and move in new alien ship
6. (Complete) Continue until last alien ship is destroyed
    a. (complete) Create win state if player wins
*/

// Declarations
let unit = 0
let turn = 1
let round = 1
let shipNum = 6
let humanstats = document.querySelector('#human-stats')
let alienStats = document.querySelector('#alien-stats')
let battleLog = document.querySelector('#full-bl')
let statement = document.querySelector('#focus')
let humanLog = document.querySelector('#human-action')
let alienLog = document.querySelector('#alien-action')
let attackBtn = document.querySelector('#attack')
let retry = document.querySelector('#retry')
let retryBtn = document.querySelector('#retry-btn')
let alienImg = document.querySelector('#alien-fighter')
let humanImg = document.querySelector('#human-fighter')
let shipModels = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/63fb3e133022173.61b4a4cb09cbb.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e3ea3a133022173.61b4a4cb93519.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e9d90c133022173.61b4a4ca1f453.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/2f91f6133022173.61b4a4cb0a9a8.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/634e1b133022173.61b4a4ccc4fa3.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1fbb32133022173.61c5d391c255b.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4ac32b133022173.61b4a4cb09707.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/c2262c133022173.61b4a4cb93017.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ea3819133022173.61c5d391c1c3d.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/d6afaa133022173.61b4a4cc6a723.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/8f8cc4133022173.61b4a4ca1ff61.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/7a83b4133022173.61b4a4cc69912.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/29ccc3133022173.61c5d391c123f.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/fbd672133022173.61b4a4ca1f87e.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/6296c8133022173.61b4a4cb0a631.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/f6ecf4133022173.61b4a4ccc59e4.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/da5f40133022173.61b4a4cc691fe.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/8025b3133022173.61b4a4cc6a195.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/244550133022173.61b4a4cc6ac58.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/609223133022173.61c5d391c2c97.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/26d10b133022173.61b4a4ccc550d.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/c23657133022173.61b4a4ccc49c9.gif",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/633cea133022173.61b4a4ca1edc7.gif"
]


///////////////////////
// Generate alien ships
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
for(let i = 0; i < shipNum; i++) {
    carrier.generateShip(carrier.generateHull(3, 6), carrier.generateFirepower(2, 4), carrier.generateAccuracy(6, 8))
}

// USS class
class USShip {
    static hull = 20;
    static firepower = 5;
    static accuracy = 0.7
}


//////////////
// Set up page
//////////////
// Show round in battlelog
let reportRound = document.createElement('h3')
reportRound.textContent = `Round ${round}`
battleLog.appendChild(reportRound)
reportRound.style.textAlign = "left"
// Show USS Assembly Stats
// hull
let humanHull = document.createElement('p')
humanHull.textContent = `Hull: ${USShip.hull}`
humanstats.appendChild(humanHull)
// firepower
let humanFire = document.createElement('p')
humanFire.textContent = `Firepower: ${USShip.firepower}`
humanstats.appendChild(humanFire)
// accuracy
let humanAcc = document.createElement('p')
humanAcc.textContent = `Accuracy: ${USShip.accuracy}`
humanstats.appendChild(humanAcc)
// Show alien ship stats
// hull
let alienHull = document.createElement('p')
alienHull.textContent = `Hull: ${carrier.ships[unit].hull}`
alienStats.appendChild(alienHull)
// firepower
let alienFire = document.createElement('p')
alienFire.textContent = `Firepower: ${carrier.ships[unit].firepower}`
alienStats.appendChild(alienFire) 
// accuracy
let alienAcc = document.createElement('p')
alienAcc.textContent = `Accuracy: ${carrier.ships[unit].accuracy}`
alienStats.appendChild(alienAcc)
//Show round number
document.querySelector('#round').textContent = `Round ${round}`
document.querySelector('#ship-number').textContent = `Alien Ship ${round}`
// Show alien model
switchAlienModel(shipModels)


/////////////////////////
// Functions to be called
/////////////////////////
// Simulate fight
// Human attack
function attack() {
    const report = document.createElement('h3')
    report.textContent = `Turn: ${turn++}`
    battleLog.appendChild(report)
    if(Math.random() <= USShip.accuracy) {
        carrier.ships[unit].hull -= USShip.firepower
        alienHull.textContent = `Hull: ${carrier.ships[unit].hull}`
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
        humanHull.textContent = `Hull: ${USShip.hull}`
        alienStrike(carrier.ships[unit].firepower)
        if(USShip.hull <= 0) {
            lose()
        }
    }
    else {
        evade()
    }
}
// Display report of battle
function humanStrike(x) {
    let report = document.createElement('p')
    report.textContent = `You hit the alien ship for ${x} damage.`
    humanLog.textContent = report.textContent
    battleLog.appendChild(report)
}
function alienStrike(x) {
    let report = document.createElement('p')
    report.textContent = `The alien ship hit your ship for ${x} damage.`
    alienLog.textContent = report.textContent
    battleLog.appendChild(report)
}
function miss() {
    let report = document.createElement('p')
    report.textContent = "You missed."
    humanLog.textContent = report.textContent
    battleLog.appendChild(report)
}
function evade() {
    let report = document.createElement('p')
    report.textContent = "You evaded the attack of the alien ship."
    alienLog.textContent = report.textContent
    battleLog.appendChild(report)
}
function alienDestroyed() {
    removeShip(alienImg)
    let report = document.createElement('p')
    report.textContent = "You defeated the alien ship."
    alienLog.textContent = "..."
    battleLog.appendChild(report)
    ++unit
    if(unit < shipNum) {       
        startNewRound()
    }
    else {
        win()
    }
}
function win() {
    statement.textContent = "You defeated the last alien ship!"
    attackBtn.style.display = 'none'
    retryBtn.innerHTML = "Play again"
    retry.style.display = 'inline'
}
function lose() {
    removeShip(humanImg)
    statement.textContent = "Your ship has been destroyed."
    attackBtn.style.display = 'none'
    retry.style.display = 'inline'
}

// Start new round
function startNewRound() {
prompt()
document.querySelector('#round').textContent = "..."
document.querySelector('#ship-number').textContent = "..."
// Show new alien ship stats
// hull
alienHull.textContent = `Hull: ${carrier.ships[unit].hull}`
// firepower
alienFire.textContent = `Firepower: ${carrier.ships[unit].firepower}`
// accuracy
alienAcc.textContent = `Accuracy: ${carrier.ships[unit].accuracy}`
}

// Present retreat/stay option
function prompt() {
    statement.textContent = "You defeated the alien ship. The next ship is coming. Would you like to retreat?"
    attackBtn.style.display = 'none'
    let buttons = document.querySelectorAll('.extra-btn')
    buttons.forEach( b => {
        b.style.display = "inline"
    })  
}
function retreat() {
    humanLog.textContent = "..."
    statement.textContent = "You have fled."
    let buttons = document.querySelectorAll('.extra-btn')
    buttons.forEach( b => {
        b.style.display = "none"
    })
    retry.style.display = 'inline' 
}
function stay() {
    let reportRound = document.createElement('h3')
    reportRound.textContent = `Round ${++round}`
    battleLog.appendChild(reportRound)
    reportRound.style.textAlign = "left"
    statement.textContent = "Ready to fire..."
    humanLog.textContent = "..."
    attackBtn.style.display = 'inline'
    document.querySelector('#round').textContent = `Round ${round}`
    document.querySelector('#ship-number').textContent = `Alien Ship ${round}`
    switchAlienModel(shipModels)
    let buttons = document.querySelectorAll('.extra-btn')
    buttons.forEach( x => {
        x.style.display = "none"
    })
}

// Switch images
function switchAlienModel(ships) {
    alienImg.setAttribute('src', ships[Math.floor(Math.random() * ships.length)])
}
function removeShip(ship) {
    ship.setAttribute('src', "")
}