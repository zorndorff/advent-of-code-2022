/**
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 **/

import assert from "node:assert";
import { debug, group } from "node:console";

type Crate = string;

type Stack = Crate[];

export class Warehouse {
  public stacks: Map<string, Stack>;
  
  constructor(){
    this.stacks = new Map();
  }

  static fromCratesInput(input: string[]){
    const warehouse = new Warehouse();
    const crateInput = input;
    try {
      let stacks: { label: string; pos: number; }[] = [];
      crateInput.forEach((line, inputIndex) => {
        if (inputIndex == 0){
          for (const [i, char] of line.split('').entries()) {
            if(char.trim() !== ''){
              stacks.push({
                label: char,
                pos: i
              });
            }
          }
        } else {

          for (let crateIndex = 0; crateIndex < stacks.length; crateIndex++) {
            const stackName = stacks[crateIndex].label;
            assert(stackName, `Stack ${crateIndex} not found!`);

            const val = line.substring(stacks[crateIndex].pos - 1, stacks[crateIndex].pos + 2);
            if(val.trim() !== ''){
              warehouse.addToStack([val], stackName);
            } 
          }  
        }
      });
    } catch (ex) {
      debugger;
      console.error(ex);
      throw ex;
    }
    return warehouse;
  }

  getOrCreateStack (stackNum: string){
    if(this.stacks.has(stackNum)){
      const existingStack = this.stacks.get(stackNum);
      assert(existingStack, 'no stack found');
      return existingStack;
    }

    const stack: Stack = [];

    this.stacks.set(stackNum, stack);

    return stack;
  }

  addToStack (crate: Crate[], stackNum: string) {
    const stack = this.getOrCreateStack(stackNum);

    this.stacks.set(stackNum, stack.concat(crate));
  }

  move(instruction: string){
    console.log(instruction);
    const [action, quantity, fromLabel, from, toLabel, to] = instruction.split(' ');
    assert(quantity, `No quantity in instruction ${instruction}`);
    assert(from, `No from in instruction ${instruction}`);
    for (let index = 1; index <= parseInt(quantity); index++) {
      debugger;
      const sourceStack = this.stacks.get(from);
      assert(sourceStack, `Cant find sourceStack ${from}`);
      const source = sourceStack.pop();

      assert(source, `No source?`);
      if(!source){
        debugger;
        return;
      }

      assert(source, `No source in stack ${from}`);
      debugger;
      this.addToStack([source], to);
    }
  }

  moveMulti(instruction: string){
    console.log(instruction);
    const [action, quantity, fromLabel, from, toLabel, to] = instruction.split(' ');
    assert(quantity, `No quantity in instruction ${instruction}`);
    assert(from, `No from in instruction ${instruction}`);
    const sourceStack = this.stacks.get(from);
    assert(sourceStack, `Cant find sourceStack ${from}`);
    const source = sourceStack.splice(sourceStack.length - parseInt(quantity), parseInt(quantity));
    this.addToStack(source, to);
  }
}

export function groupStateInput(input: string[]): { crateInput: string[], moveInput: string[], gotDivider: boolean} | undefined {

  const grouped = input.reverse().reduce((acc: {crateInput: string[], moveInput: string[], gotDivider: boolean} | undefined, value) => {
    assert(acc);

    if (value == ''){
      acc.gotDivider = true;
      return acc;
    }

    if (!acc.gotDivider){
      acc.moveInput.push(value);
    } else {
      acc.crateInput.push(value.trimEnd());
    }
    return acc;

  }, { crateInput:[], moveInput: [], gotDivider: false});

  return {
    crateInput: grouped?.crateInput ?? [],
    moveInput: grouped?.moveInput.reverse() ?? [],
    gotDivider: grouped?.gotDivider ?? false,
  };
}

export function solve(input: string[], mode: 'single' | 'multi' = 'single') {

  const parsedInput = groupStateInput(input);

  assert(parsedInput?.crateInput, 'NO CRATE STATE PARSED');
  const warehouse = Warehouse.fromCratesInput(parsedInput?.crateInput);
  console.log(warehouse);
  parsedInput.moveInput.forEach((moveInstruction) => {
    if(mode == 'multi'){
      warehouse.moveMulti(moveInstruction);
    }

    if(mode == 'single'){
      warehouse.move(moveInstruction);
    }
    console.log(warehouse);
  });

  return warehouse;
}