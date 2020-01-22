
class GameWorld {
    constructor(gameCode, citiesJsonFile, diseases, players) {
        this.gameCode = gameCode;
        this.cities = [];
        this.createCities(citiesJsonFile, diseases);
        this.players = players;
        this.playerPawns = [];
        this.turnTracker = 0;

        //Create player pawns
        for (let i = 0; i < this.players.length; i++) {
            this.playerPawns.push(new PlayerPawn(this.players[0], this.cities[0]));
        }
    }

    createCities(jsonFile, diseases) {
        var keys = Object.keys(jsonFile);

        for (let i = 0; i < keys.length; i++) {
            this.cities.push(new City(keys[i], jsonFile[keys[i]].connections, diseases));
        }
    }

    getPawnLocations() {
        var pawnLocations = [];

        for (let i = 0; i < this.playerPawns.length; i++) {
            //Checks the pawns currenct city against the array of cities
            for (let j = 0; j < this.cities.length; j++) {
                if (this.playerPawns[i].getCurrentCity() == this.cities[j]) {
                    //If it finds the city it adds the cities index location
                    pawnLocations.push(j);
                }
            }
        }

        return pawnLocations;
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

    getPlayerPawns() {
        console.log(this.playerPawns[0].getPlayer());
        return this.playerPawns;
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
    constructor(player, startingCity) {
        this.player = player;
        this.city = startingCity;
    } 

    getPlayer() {
        return this.player;
    }

    getCurrentCity() {
        return this.city;
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