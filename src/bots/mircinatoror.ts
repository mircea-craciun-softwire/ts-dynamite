import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    readonly possibleMoves: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];
    makeMove(gamestate: Gamestate): BotSelection {
        return this.getRandomElement(this.possibleMoves);
    }

    private getRandomElement(set: BotSelection[]): BotSelection {
        return set[this.getRandomNumber(set.length)];
    }

    private getRandomNumber(max: number): number{
        return Math.floor(Math.random() * max);
    }
}

export = new Bot();
