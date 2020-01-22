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


    getHost() {
        return this.host;
    }

    getPlayers() {
        return this.players;
    }

    getLobbyCode() {
        return this.lobbyCode;
    }

}

class Player {
    constructor(playerName, socket) {
        this.playerName = playerName;
        this.socket = socket;
        this.availableActions = 4;
    }

    connectToLobby(lobby) {
        this.lobby = lobby;
    }

    disconnectFromLobby() {
        if (this.lobby != null) {
            this.lobby.removePlayer(this);
            this.lobby = null;
        }
    }

    useAction(action) {
        if (this.availableActions > 0) {
            this.availableActions--;
        }
    }


    getName() {
        return this.playerName;
    }

    getSocket() {
        return this.socket;
    }

    getConnectedLobby() {
        return this.lobby;
    }

    getAvailableActions() {
        return this.availableActions;
    }
}

module.exports.Player = Player;
module.exports.Lobby = Lobby;