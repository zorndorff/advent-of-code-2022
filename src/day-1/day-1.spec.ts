import assert from 'node:assert';
import test from 'node:test';
import { group, solve } from './day-1';

test('should group the elves from the example problem', () => {
  const input = [
    '1000',
    '2000',
    '3000',
    '',
    '4000',
    '',
    '5000',
    '6000',
    '',
    '7000',
    '8000',
    '9000',
    '',
    '10000'
  ];
  const solved = group(input);

  //The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories
  assert.strictEqual(solved[0].total, 6000);
  //The second Elf is carrying one food item with 4000 Calories.
  assert.strictEqual(solved[1].total, 4000);
  //The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
  assert.strictEqual(solved[2].total, 11000);
  //The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
  assert.strictEqual(solved[3].total, 24000);
  //The fifth Elf is carrying one food item with 10000 Calories.
});

test('should solve the example problem', () => {
  const input = [
    '1000',
    '2000',
    '3000',
    '',
    '4000',
    '',
    '5000',
    '6000',
    '',
    '7000',
    '8000',
    '9000',
    '',
    '10000'
  ];
  const solved = solve(input);

  //The Elf is carrying the most food.
  assert.strictEqual(solved.total, 24000);
});