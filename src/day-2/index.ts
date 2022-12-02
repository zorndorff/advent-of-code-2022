import { readFileSync } from 'node:fs';
import {join} from 'node:path';

import { solve, solveMoves } from './day-2';

function main() {
  const input = readFileSync(join(__dirname, './input.txt'))
    .toString()
    .split('\n');
  
  const output = solve(input);
  console.log(output);

  console.log(`Game results : ${output.playerScores}`);

  const output2 = solveMoves(input);

  console.log(`Game results 2: ${output2.playerScores}`);

}

main();