import assert from 'node:assert';
import test from 'node:test';
import { solve } from './day-2';

test('should solve the first example problem', () => {
  const input = [
    'A Y',
    'B X',
    'C Z'
  ];

  const solved = solve(input);

  assert.deepEqual(solved.playerScores, [15, 15]);

});
