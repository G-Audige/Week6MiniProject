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
for(let i = 0; i < 6; i++) {
    carrier.generateShip(carrier.generateHull(3, 6), carrier.generateFirepower(2, 4), carrier.generateAccuracy(6, 8))
}
console.log(carrier.ships[2].hull)

