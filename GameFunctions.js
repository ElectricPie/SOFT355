class GameWorld {
    constructor(citiesJsonFile) {
        this.createCities(citiesJsonFile);
    }

    createCities(jsonFile) {
        this.cities = [];

        var keys = Object.keys(jsonFile);

        for (let i = 0; i < keys.length; i++) {
            this.cities.push(new City(keys[i], jsonFile[keys[i]].connections));
        }
    }

    getCities() {
        return this.cities;
    }
}

class City {
    constructor(name, connections) {
        this.name = name;
        this.connections = connections;
    }

    getName() {
        return this.name;
    }

    getConnections(){
        return this.connections;
    }
}

class PlayerPawn {
    constructor() {

    }
}

function createCity() {

}
module.exports.GameWorld = GameWorld;
module.exports.City = City;