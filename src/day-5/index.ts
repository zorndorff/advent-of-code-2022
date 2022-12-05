import { readFileSync } from 'node:fs';
import {join} from 'node:path';

import { solve } from './day-5';

function main() {
  const input = readFileSync(join(__dirname, './input.txt'))
    .toString()
    .split('\n');
  
  const output = solve(input);
  console.log(output);

  console.log(`Game results : ${output}`);

  const output2 = solve(input, 'any');
  console.log(`Game results : ${output2}`); 
}

main();