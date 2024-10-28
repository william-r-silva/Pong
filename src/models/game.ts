import Ball from './ball';
import Player from './player';

import { updateGame } from '../servers/websocket';

export default class Game {
    static currentGame: Game;

    screenWidth: number = 0;
    screenHeight: number = 0;
    
    players: Player[] = [];
    ball: Ball | null = null;
    
    private isGameReady: boolean = false;

    constructor(){}

    updateScreenSize(screenWidth: number, screenHeight: number){
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    startGame(){
        this.isGameReady = true;
        this.ball = new Ball(this.screenWidth / 2, this.screenHeight / 2, 10, '#000000');

        setInterval(this.animate, 1000 * 5);
    }

    addPlayer(player: Player){
        this.players.push(player);
    }

    animate(){
        updateGame({
            ball: this.ball,
            players: this.players
        });
    }

    static create(){
        if(!this.currentGame){
            this.currentGame = new Game();
        }
        return this.currentGame;
    }

    static get(){
        return this.currentGame;
    }
}