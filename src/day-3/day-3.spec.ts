import assert from "node:assert";
import test from "node:test";
import { rucksack, solve, solvePart2 } from "./day-3";

test("rucksack: should return the correctly compartmentalized contents", () => {
  const sack = rucksack("vJrwpWtwJgWrhcsFMMfFFhFp");
  
  assert.equal(sack.compartments.length, 2, 'Compartment length != 2');
  assert.deepEqual(sack.shared, [
    "p",
  ]);
});

test("should solve the first example problem", () => {
  const input = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];

  const solved = solve(input);

  assert.equal(solved, 157);
});


test("should solve part two", () => {
  const input = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];

  const solved = solvePart2(input);

  assert.equal(solved, 70);
});
