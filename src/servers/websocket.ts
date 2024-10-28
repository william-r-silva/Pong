import Game from "../models/game";
import Player from "../models/player";
import { io } from "./http";

io.on("connection", (socket) => {
    const gameConfigs = Game.create();
    socket.emit('onSuccessfullyConnected', {});

    socket.on('onUpdateScreen', (data) => {
        gameConfigs.updateScreenSize(data.width, data.height);
        gameConfigs.players.push(
            new Player(socket.id, 10, data.height / 2)
        );
        console.log('Players: '+gameConfigs.players.length);
        if(gameConfigs.players.length >= 2){
            gameConfigs.startGame();
        }
    });
    
    socket.on('onUpdatePlayer', (data) => {
        gameConfigs?.players.forEach(player => {
            if(player.id === socket.id){
                player.setKeysPressed(data);
            }
        });
    });

    socket.on('disconnect', (data) => {
        const index = gameConfigs?.players?.findIndex(player => player.id === socket.id);
        if (index !== -1) {
            gameConfigs.players.splice(index, 1);
        }
    })
});

export function updateGame(game: Object){
    io.emit('onUpdateGame', game);
}