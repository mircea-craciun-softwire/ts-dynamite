import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    readonly possibleMoves: string[] = [ 'R' , 'P' , 'S' , 'D' , 'W'];

    makeMove(gamestate: Gamestate): BotSelection {

        this.possibleMoves

        return 'P';
    }

    private getBeatingMove(move: string): string {
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
                return ;
        }
    }
}

export = new Bot();