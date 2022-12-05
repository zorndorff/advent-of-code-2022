/**
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 **/

import assert from "node:assert";

type Crate = string;

type Stack = Set<Crate>;

export class Warehouse {
  public stacks: Stack[];
  
  constructor(){
    this.stacks = [];
  }

  get overlap(){
    return this._overlap;
  }

  add (toAdd: Assignment, overlapType: 'any' | 'full' = 'full') {
    let hasOverlap = this._overlap;

    for (const assignment of this.assignments) {
      if(overlapType == 'full'){
        if(assigmentsOverlap(assignment, toAdd) || assigmentsOverlap(toAdd, assignment)){
          hasOverlap = true;
          break;
        }
      }
      if(overlapType == 'any'){
        if(assigmentsHaveAnyOverlap(assignment, toAdd) || assigmentsHaveAnyOverlap(toAdd, assignment)){
          hasOverlap = true;
          break;
        }
      }
    }

    this.assignments.push(toAdd);

    this._overlap = hasOverlap;
  }
}


export function assigmentsHaveAnyOverlap(primary: Assignment, secondary: Assignment){
  for (let index = primary.range.start; index <= primary.range.end; index++) {
    if(index <= secondary.range.end && index >= secondary.range.start){
      return true;
    }
  }
  return false;
}


export function assigmentsOverlap(primary: Assignment, secondary: Assignment){
  return (primary.range.end >= secondary.range.end && primary.range.start <= secondary.range.start);
}

export function assignmentFromRangeInput(input: string){
  const [rangeStart, rangeEnd] = input.split('-');
  return {
    range: {
      start: parseInt(rangeStart),
      end: parseInt(rangeEnd),
    }
  }
}

export function toAssignments(input: string, overlapType: 'full' | 'any' = 'full') {
  const [assignmentInput1, assignmentInput2] = input.split(',');
  const assigments = new Assignments();
  assigments.add(assignmentFromRangeInput(assignmentInput1), overlapType);
  assigments.add(assignmentFromRangeInput(assignmentInput2), overlapType);

  return assigments;
}

export function solve(input: string[], overlapMode: 'any' | 'full' = 'full') {
  const parsedAssignments = input.map((inputString: string) => {
    return toAssignments(inputString, overlapMode);
  })

  const totalOverlap = parsedAssignments.reduce((acc, val) => {
    if(val.overlap){
      acc += 1;
    }
    return acc;
  }, 0);

  return totalOverlap;
}