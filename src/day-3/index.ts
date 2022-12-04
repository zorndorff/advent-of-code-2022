import { readFileSync } from 'node:fs';
import {join} from 'node:path';

import { solve, solvePart2 } from './day-3';

function main() {
  const input = readFileSync(join(__dirname, './input.txt'))
    .toString()
    .split('\n');
  
  const output = solve(input);
  console.log(output);

  console.log(`Game results : ${output}`);

  const output2 = solvePart2(input);

  console.log(`Game results 2: ${output2}`);

}

main();