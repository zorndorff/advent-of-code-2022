import { readFileSync } from 'node:fs';
import {join} from 'node:path';

import { solve } from './day-5';

function main() {
  const input = readFileSync(join(__dirname, './input.txt'))
    .toString()
    .split('\n');
  
  const output = solve(input);
  
  console.log(`Game results : ${Array.from(output.stacks.entries()).map((stack) => stack[stack.length - 1])}`);
}

main();