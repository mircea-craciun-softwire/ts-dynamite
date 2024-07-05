import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    readonly possibleMoves: string[] = [ 'R' , 'P' , 'S' , 'D' , 'W'];

    makeMove(gamestate: Gamestate): BotSelection {

        if(gamestate.rounds.length > 0) {
            return this.getBeatingMove(this.getOpponentLastMove(gamestate));
        }else{
            return 'D';
        }

    }

    private getOpponentLastMove(gamestate: Gamestate): BotSelection{
        return gamestate.rounds[gamestate.rounds.length - 1].p2;
    }

    private getBeatingMove(move: BotSelection): BotSelection {
        switch (move){
            case 'R':
                return 'P';
            case 'P':
                return 'S';
            case 'S':
                return 'R';
            case 'D':
                return 'W';
            case 'W':
                return this.getRandomElement(['R','P','S']);
        }
    }

    private getRandomElement(set: BotSelection[]): BotSelection{
        const index = Math.floor(Math.random() * set.length);
        return set[index];
    }
}

export = new Bot();