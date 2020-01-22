class GameWorld {
    constructor(citiesJsonFile, diseases) {
        this.createCities(citiesJsonFile, diseases);
    }

    createCities(jsonFile, diseases) {
        this.cities = [];

        var keys = Object.keys(jsonFile);

        for (let i = 0; i < keys.length; i++) {
            this.cities.push(new City(keys[i], jsonFile[keys[i]].connections, diseases));
        }
    }

    getCities() {
        return this.cities;
    }
}

class City {
    constructor(name, connections, diseases) {
        this.name = name;
        this.connections = connections;
        this.diseases = diseases;
    }

    getName() {
        return this.name;
    }

    getConnections(){
        return this.connections;
    }

    getDiseases() {
        return this.diseases
    }
}

class PlayerPawn {
    constructor() {
        
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
    }

    getDiseaseType() {
        return this.diseaseType;
    }
}

module.exports.GameWorld = GameWorld;
module.exports.City = City;
module.exports.PlayerPawn = PlayerPawn;
module.exports.Disease = Disease;
module.exports.DiseaseCityTracker = DiseaseCityTracker;