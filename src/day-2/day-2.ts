/**
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
**/


class Elf {
  private ledger: number[];
  private name: string;
  private _total: number;

  constructor(name: string){
    this.ledger = [];
    this._total = 0;
    this.name = name;
  }

  deposit(value: number): void {
    this.ledger.push(value);
    this._total = this.getTotal();
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
