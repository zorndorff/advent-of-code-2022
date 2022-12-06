import assert from "node:assert";
import test from "node:test";
import { groupStateInput, solve, Warehouse } from "./day-5";

test("should solve the first example problem", () => {
  const input = [
    "[D]        ",
    "[N] [C]    ",
    "[Z] [M] [P]",
    " 1   2   3 ",
    "",
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ];

  const solved = solve(input);

  assert.deepEqual(solved.stacks.get("1"), ['[C]']);
  assert.deepEqual(solved.stacks.get("2"), ['[M]']);
  assert.deepEqual(solved.stacks.get("3"), ['[P]', '[D]', '[N]', '[Z]']);
  
});

test("should correctly parse Crate state input", () => {
  const input = ["[D]    ", "[N] [C]    ", "[Z] [M] [P]", " 1   2   3 "];

  const warehouse = Warehouse.fromCratesInput(input.reverse());

  assert.equal(warehouse.stacks.has("1"), true);
  assert.equal(warehouse.stacks.has("2"), true);
  assert.equal(warehouse.stacks.has("3"), true);

  assert.equal(warehouse.stacks.get("1")?.length, 3);
});

test("should correctly process single move instructions", () => {
  const input = ["[D]    ", "[N] [C]    ", "[Z] [M] [P]", " 1   2   3 "];

  const warehouse = Warehouse.fromCratesInput(input.reverse());

  warehouse.move("move 1 from 2 to 1");

  assert.deepEqual(warehouse.stacks.get("1"), ['[Z]', '[N]', '[D]', '[C]']);
  assert.deepEqual(warehouse.stacks.get("2"), ['[M]']);
});


test("should correctly process multiple move instructions", () => {
  const input = ["[D]    ", "[N] [C]    ", "[Z] [M] [P]", " 1   2   3 "];

  const warehouse = Warehouse.fromCratesInput(input.reverse());

  warehouse.move("move 1 from 2 to 1");
  warehouse.move("move 3 from 1 to 3");

  assert.deepEqual(warehouse.stacks.get("1"), ['[Z]']);
  assert.deepEqual(warehouse.stacks.get("2"), ['[M]']);
  assert.deepEqual(warehouse.stacks.get("3"), ['[P]', '[C]', '[D]', '[N]']);
  
});


test("should correctly parse overall input", () => {
  const input = [
    "[D]        ",
    "[N] [C]    ",
    "[Z] [M] [P]",
    " 1   2   3 ",
    "",
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ];
  const grouped = groupStateInput(input);
  assert.deepEqual(grouped?.crateInput, [
    " 1   2   3",
    "[Z] [M] [P]",
    "[N] [C]",
    "[D]",
  ]);

  assert.deepEqual(grouped?.moveInput, [
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ]);
});
