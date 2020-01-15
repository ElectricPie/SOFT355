class Lobby {
    constructor(host) {
        this.host = host;
        this.players = [];
        this.lobbyCode = "";
    }

    getHost() {
        return this.host;
    }

    getPlayers() {
        return this.players;
    }

    lobbyCode() {
        return lobbyCode;
    }
}

class Player {
    constructor(playerName, socket) {
        this.playerName = playerName;
        this.socket = socket;
    }

    getName() {
        return this.playerName;
    }

    getSocket() {
        return this.socket;
    }
}

module.exports.Player = Player;
module.exports.Lobby = Lobby;