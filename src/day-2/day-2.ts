/**
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
**/

type GameInput = `A` | `B` | `C` | `X` | `Y` | `Z`;

class Move {
  public input: GameInput[];
  private _beats?: Move;
  public value: number;
  private label: string;

  constructor(input: GameInput[], value: number, label: string){
    this.label = label;
    this.input = input;
    this.value = value;
  }

  setBeats(move: Move){
    this._beats = move;
  }

  beats(move: Move){
    return move.label == this._beats?.label ?? '';
  }
};

const Rock: Move = new Move(['A', 'X'], 1, 'Rock');

const Scissors: Move = new Move(['C', 'Y'], 3, 'Scissors');

const Paper: Move = new Move(['C', 'Y'], 3, 'Paper');

Rock.setBeats(Scissors);
Paper.setBeats(Rock);
Scissors.setBeats(Paper);

const moves = [Rock, Paper, Scissors];

class Game {
  private scores: number[];

  constructor(){
    this.scores = [0,0];
  }

  play(player1Input: GameInput, player2Input: GameInput): void {
    let [player1Score, player2Score] = this.scores;
    const player1Move = moves.find((move) => move.input.includes(player1Input))
    const player2Move = moves.find((move) => move.input.includes(player2Input))

    if(player1Move.beats(player2Input) && player2Move?.beats(player1Input)){
      player1Score += player1Move?.value ?? 0;
    }
  }
  get total() {
    return this._total;
  }
  getTotal(){
    return this.ledger.reduce((acc, value) => {
      return (acc + value);
    }, 0);
  } 
}

export function group(input: string[]): Elf[]{
  const elves: Elf[] = [];

  let currentElf = new Elf(`Elf 0`);
  let index = 0;

  for (const line of input) {
    if(line.trim() == ''){
      elves.push(currentElf);
      currentElf = new Elf(`Elf ${index}`);  
      index ++;
    } else {
      const value = parseInt(line.trim());
      currentElf.deposit(value);
    }
  }
  return elves.sort((a: Elf, b: Elf) => {
    if (a.total > b.total) {
      return -1;
    }
    if (a.total < b.total) {
      return 1;
    }

    return 0;
  });
}

export function solve(input: string[]): Elf[] {
  const grouped = group(input);

  const richestElves = grouped.splice(0, 3);

  return richestElves;
}
