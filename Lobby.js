class Lobby {
    constructor(host) {
        this.host = host;
        this.players = [];
        this.lobbyCode = this.generateLobbyCode();
    }

    addPlayer(player) {
        player.connectToLobby(this);
        this.players.push(player);
    }

    removePlayer(player) {
        for (let i = 0; i < this.players.length; i++) {
            if (player == this.players[i]) {
                this.players.splice(i, 1);
            }
        }
    }

    getHost() {
        return this.host;
    }

    getPlayers() {
        return this.players;
    }

    getLobbyCode() {
        return this.lobbyCode;
    }

    generateNewLobbyCode() {
        this.lobbyCode = this.generateLobbyCode();
    }

    generateLobbyCode() {
        var genCode = "";
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        genCode += this.host.getName()[3].toUpperCase();

        for (let i = 0; i < 2; i++) {
            genCode += characters[Math.round(Math.random() * 10)]
        }

        genCode += this.host.getName()[1].toUpperCase();
        genCode += this.host.getName()[0].toUpperCase();

        for (let i = 0; i < 2; i++) {
            genCode += characters[Math.round(Math.random() * 10)]
        }
        
        return genCode;
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

    connectToLobby(lobby) {
        this.lobby = lobby;
    }

    getConnectedLobby() {
        return this.lobby;
    }

    disconnectFromLobby() {
        if (this.lobby != null) {
            this.lobby.removePlayer(this);
            this.lobby = null;
        }
    }
}

module.exports.Player = Player;
module.exports.Lobby = Lobby;