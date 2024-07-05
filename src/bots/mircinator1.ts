import {Gamestate, BotSelection} from '../models/gamestate';

class Bot {

    readonly possibleMoves: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];

    dynamitesLeft = 100;

    makeMove(gamestate: Gamestate): BotSelection {

        let chosenMove: BotSelection;

        if (gamestate.rounds.length > 0) {
            chosenMove = this.getBeatingMove(this.getRandomElement(this.possibleMoves.filter(
                move => {
                    if (this.dynamitesLeft > 0) {
                        return move !== this.getOpponentLastMove(gamestate);
                    } else {
                        return move !== this.getOpponentLastMove(gamestate) && move !== 'D';
                    }
                }
            )));
        } else {
            chosenMove = 'D';
        }

        if (chosenMove === 'D') {
            if (this.dynamitesLeft < 1) return 'S';
            this.dynamitesLeft--;
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
        const index = Math.floor(Math.random() * set.length);
        return set[index];
    }
}

export = new Bot();