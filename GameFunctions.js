class GameWorld {
    constructor(gameCode, citiesJsonFile, diseases, players) {
        this.gameCode = gameCode;
        this.game
        this.createCities(citiesJsonFile, diseases);
        this.players = players;
    }

    createCities(jsonFile, diseases) {
        this.cities = [];

        var keys = Object.keys(jsonFile);

        for (let i = 0; i < keys.length; i++) {
            this.cities.push(new City(keys[i], jsonFile[keys[i]].connections, diseases));
        }
    }

    getGameCode() {
        return this.gameCode;
    }

    getCities() {
        return this.cities;
    }

    getPlayers() {
        return this.players;
    }
}

class City {
    constructor(name, connections, diseases) {
        this.name = name;
        this.connections = connections;
        //Create disease trackers for each disease
        this.diseaseTrackers = [
            new DiseaseCityTracker(diseases[0]),
            new DiseaseCityTracker(diseases[1]), 
            new DiseaseCityTracker(diseases[2]), 
            new DiseaseCityTracker(diseases[3])  
        ];
    }

    getName() {
        return this.name;
    }

    getConnections(){
        return this.connections;
    }

    getDiseaseTrackers() {
        return this.diseaseTrackers;
    }
}

class PlayerPawn {
    constructor(player, startCity) {
        this.player = player;
        this.currentCity = startCity;
    }

    getPlayer() {
        return this.player;
    }

    getCurrentCity() {
        return this.currentCity;
    }
}

class Disease {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }

    increaseCount() {
        this.count++;
    }

    decreaseCount() {
        //Prevents the count from going below 0
        if (this.count > 0) {
            this.count--;
        }
    }

    getName() {
        return this.name;
    }

    getCount() {
        return this.count;
    }
}

class DiseaseCityTracker{ 
    constructor(disease) {
        this.diseaseType = disease;
        this.diseaseCount = 0;
    }

    increaseCount() {
        this.diseaseCount++;
        this.diseaseType.increaseCount();
    }

    decreaseCount() {
        this.diseaseCount--;
        this.diseaseType.decreaseCount();
    }

    getDiseaseType() {
        return this.diseaseType;
    }

    getDiseaseCount() {
        return this.diseaseCount;
    }
}

module.exports.GameWorld = GameWorld;
module.exports.City = City;
module.exports.PlayerPawn = PlayerPawn;
module.exports.Disease = Disease;
module.exports.DiseaseCityTracker = DiseaseCityTracker;