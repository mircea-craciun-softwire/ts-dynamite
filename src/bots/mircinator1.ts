import {Gamestate, BotSelection} from '../models/gamestate';

class Bot {

    readonly possibleMoves: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];

    dynamitesLeft = 100;

    dynamiteInterval: number;

    defaultConsecTimeBeforeWater = 3;

    opponentConsecutiveDynamiteBeforeWater: number[] = [];

    makeMove(gamestate: Gamestate): BotSelection {

        this.dynamiteInterval = this.getRandomNumber(15) + 10;

        let chosenMove: BotSelection;

        if (gamestate.rounds.length > 2){
            if(gamestate.rounds[gamestate.rounds.length - 1].p2 === 'W'){
                if(gamestate.rounds[gamestate.rounds.length - 2].p2 === 'D'){
                    this.opponentConsecutiveDynamiteBeforeWater.push(this.numberOfPreviousConsecutiveDynamitedRounds(gamestate, 1));
                    let matching: number = 0;
                    for (let i = 0; i < this.opponentConsecutiveDynamiteBeforeWater.length - 1; i++)
                    {
                        for (let j = i + 1; j < this.opponentConsecutiveDynamiteBeforeWater.length;j++)
                        {
                            if(this.opponentConsecutiveDynamiteBeforeWater[i] === this.opponentConsecutiveDynamiteBeforeWater[j]){
                                matching++;
                            }
                        }
                    }
                    if(matching > 3){
                        this.defaultConsecTimeBeforeWater = this.opponentConsecutiveDynamiteBeforeWater[0];
                    }
                }
            }
        }

        if ((gamestate.rounds.length % this.dynamiteInterval === 0 || this.hasDrawnLastNRounds(gamestate, 1)) && gamestate.rounds.length > 1) {
            if (this.numberOfPreviousConsecutiveDynamitedRounds(gamestate, 0) == this.defaultConsecTimeBeforeWater){
                chosenMove = 'S';
            }else{
                chosenMove = 'D';
                this.dynamiteInterval = this.getRandomNumber(15) + 10;
            }
        }else{
            if (this.opponentHasRepeatedInTheLastNTurns(gamestate, 5)) {
                chosenMove = this.getBeatingMove(this.getOpponentLastMove(gamestate));
            }else{
                chosenMove = this.getRandomElement( ['R','P','S'] );
            }
        }

        if(gamestate.rounds.length > 1600){
            this.dynamiteInterval = 3;
        }

        if (chosenMove === 'D') {
            if (this.dynamitesLeft < 1) {
                return 'S';
            }else {
                this.dynamitesLeft--;
            }
        }
        return chosenMove;
    }

    private getOpponentLastMove(gamestate: Gamestate): BotSelection {
        return gamestate.rounds[gamestate.rounds.length - 1].p2;
    }

    private getBeatingMove(move: BotSelection): BotSelection {
        switch (move) {
            case 'R':
                return 'P';
            case 'P':
                return 'S';
            case 'S':
                return 'R';
            case 'D':
                return 'W';
            case 'W':
                return this.getRandomElement(['R', 'P', 'S']);
        }
    }

    private getRandomElement(set: BotSelection[]): BotSelection {
        return set[this.getRandomNumber(set.length)];
    }

    private getRandomNumber(max: number): number{
        return Math.floor(Math.random() * max);
    }

    private opponentHasRepeatedInTheLastNTurns(gameState: Gamestate, n: number){
        for (let i = gameState.rounds.length - 2; i >= (gameState.rounds.length - n) && i > 0; i--){
            if (gameState.rounds[i].p2 === gameState.rounds[i + 1].p2){
               return true;
            }
        }
        return false;
    }

    private hasDrawnLastNRounds(gameState: Gamestate, n: number){
        for (let i = gameState.rounds.length - 1; i >= (gameState.rounds.length - n) && i > 0; i--){
            if (gameState.rounds[i].p2 !== gameState.rounds[i].p1){
                return false;
            }
        }
        return true;
    }

    private numberOfPreviousConsecutiveDynamitedRounds(gameState: Gamestate, offset: number){
        let i = gameState.rounds.length - 1 - offset;
        let count = 0;
        while(i > 0 && gameState.rounds[i].p2 === 'D'){
            i--;
            count++;
        }
        return count;
    }
}

export = new Bot();