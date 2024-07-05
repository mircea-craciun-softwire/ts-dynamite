import {Gamestate, BotSelection} from '../models/gamestate';

class Bot {

    readonly possibleMoves: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];

    dynamitesLeft = 100;

    dynamiteInterval: number;

    makeMove(gamestate: Gamestate): BotSelection {

        this.dynamiteInterval = this.getRandomNumber(25);

        let chosenMove: BotSelection;

        if (gamestate.rounds.length % this.dynamiteInterval === 0) {
            chosenMove = 'D';
            this.dynamiteInterval = this.getRandomNumber(25);
        }else{
            if (this.opponentHasRepeatedInTheLastNTurns(gamestate, 5)) {
                chosenMove = this.getBeatingMove(this.getOpponentLastMove(gamestate));
            }else{
                chosenMove = this.getRandomElement( this.possibleMoves );
            }
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
}

export = new Bot();