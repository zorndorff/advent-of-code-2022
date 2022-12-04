import assert from "node:assert";
import test from "node:test";
import { assigmentsOverlap, assignmentFromRangeInput, Assignments, solve, toAssignments } from "./day-4";

test("should solve the first example problem", () => {
  const input = [
    '2-4,6-8',
    '2-3,4-5',
    '5-7,7-9',
    '2-8,3-7',
    '6-6,4-6',
    '2-6,4-8'
  ];

  const solved = solve(input, 'full');

  assert.equal(solved, 2);
});


test("should solve the 2nd example problem", () => {
  const input = [
    '2-4,6-8',
    '2-3,4-5',
    '5-7,7-9',
    '2-8,3-7',
    '6-6,4-6',
    '2-6,4-8'
  ];

  const solved = solve(input, 'any');

  assert.equal(solved, 4);
});

test("Assignments.assignmentFromRangeInput: correctly parses ranges", () => {
  const result = assignmentFromRangeInput('2-4');
  assert.deepEqual(result, {
    range: {
      start: 2,
      end: 4
    }
  }, 'Range was not parsed correctly.');
});

test("assigmentsOverlap: correctly identify overlaps", () => {
  const assignments = toAssignments('2-8,3-7');
  
  assert.equal(assignments.overlap, true);
});

test("assigmentsOverlap: correctly identify overlaps with weird range", () => {
  const assignments = toAssignments('6-6,4-6');
  
  assert.equal(assignments.overlap, true);
});

test("Assignments.add: correctly identify overlaps", () => {
  const assignmentGroup = new Assignments(); 
  const assigments = toAssignments('2-8,3-7');

  assert.equal(assigments.overlap, true);
});

test("toAssignments: correctly identify overlaps in 'any' mode", () => {
  const inputs = [
    '5-7,7-9',
    '2-8,3-7',
    '6-6,4-6',
    '2-6,4-8',
  ];
  for (const input of inputs) {
    const assigments = toAssignments(input, 'any');
    assert.equal(assigments.overlap, true, `Error overlapping ${input}`);
  }
});





