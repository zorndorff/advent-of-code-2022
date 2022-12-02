/**
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 **/

import assert from "node:assert";

type GameInput = `A` | `B` | `C` | `X` | `Y` | `Z`;

type Outcome = "WIN" | "LOSE" | "DRAW";

class Move {
  public input: GameInput[];
  public _beats?: Move;
  public readonly value: number;
  public readonly label: string;

  constructor(input: GameInput[], value: number, label: string) {
    this.label = label;
    this.input = input;
    this.value = value;
  }

  setBeats(move: Move) {
    this._beats = move;
  }

  beats(move: Move) {
    return move.label == this._beats?.label ?? "";
  }
}

const Rock: Move = new Move(["A", "X"], 1, "Rock");
const Paper: Move = new Move(["B", "Y"], 2, "Paper");
const Scissors: Move = new Move(["C", "Z"], 3, "Scissors");

Rock.setBeats(Scissors);
Paper.setBeats(Rock);
Scissors.setBeats(Paper);

const moves = [Rock, Paper, Scissors];

class Game {
  private scores: number[];

  constructor() {
    this.scores = [0, 0];
  }

  static solveMove(player1Input: GameInput, outcome: Outcome): Move {
    const player1Move = moves.find((move) => move.input.includes(player1Input));
    assert(player1Move, "did not find player move!");
    assert(player1Move._beats, "_beats was undefined!");

    switch (outcome) {
      case "DRAW":
        return player1Move;
        break;
      case "LOSE":
        return player1Move._beats;
        break;
      case "WIN":
        const winningMove = moves.find((move) => move.beats(player1Move));
        assert(winningMove, "Could not find a winning move!");
        return winningMove;
        break;
      default:
        throw new Error("State not implemented!");
    }
  }

  play(player1Input: GameInput, player2Input: GameInput): string {
    let [player1Score, player2Score] = this.scores;
    let winner;

    const player1Move = moves.find((move) => move.input.includes(player1Input));
    const player2Move = moves.find((move) => move.input.includes(player2Input));

    if (!player1Move || !player2Move) {
      throw new Error("Move not found");
    }

    if (
      (player1Move.beats(player2Move) && player2Move.beats(player1Move)) ||
      player1Move == player2Move
    ) {
      player1Score += player1Move.value + 3;
      player2Score += player2Move.value + 3;
      winner = "DRAW";
    } else if (player1Move.beats(player2Move)) {
      player1Score += player1Move.value + 6;
      player2Score += player2Move.value;
      winner = "PLAYER 1";
    } else if (player2Move.beats(player1Move)) {
      player2Score += player2Move.value + 6;
      player1Score += player1Move.value;
      winner = "PLAYER 2";
    }

    this.scores = [player1Score, player2Score];
    return winner || "ERROR";
  }
  get playerScores() {
    return this.scores;
  }
}

export function solve(input: string[]): Game {
  const game = new Game();

  input.forEach((line) => {
    const [player1GameInput, player2GameInput] = line.split(" ");
    const winner = game.play(
      player1GameInput as GameInput,
      player2GameInput as GameInput
    );
    console.log(`Winner ${winner}`);
  });

  return game;
}

export function solveMoves(input: string[]): Game {
  const game = new Game();

  input.forEach((line) => {
    const [player1GameInput, desiredOutcome] = line.split(" ");
    let solveFor: Outcome;

    switch(desiredOutcome){
      case 'X':
      solveFor = 'LOSE';
      break;
      case 'Y':
      solveFor = 'DRAW';
      break;
      case 'Z':
      solveFor = 'WIN';
      break;
      default:
        throw new Error('ERROR');
    }

    const player2GameInput = Game.solveMove(player1GameInput as GameInput, solveFor).input[0];

    const winner = game.play(
      player1GameInput as GameInput,
      player2GameInput as GameInput
    );
    console.log(`Winner ${winner}`);
  });

  return game;
}
