import { readFileSync } from 'node:fs';
import {join} from 'node:path';

import { solve } from './day-2';

function main() {
  const input = readFileSync(join(__dirname, './input.txt'))
    .toString()
    .split('\n');
  
  const output = solve(input);
  console.log(output);

  const total = output.reduce((acc, elf) => {
    acc += elf.total;
    return acc;
  }, 0);

  console.log(`Rich Elf total : ${total}`);
}

main();