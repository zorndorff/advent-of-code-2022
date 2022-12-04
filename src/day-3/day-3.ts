/**
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 **/

import assert from "node:assert";
import { stringify } from "node:querystring";

type Item = string;

type Compartment = Map<string, boolean>;

type RuckSack = {
  original: Compartment;
  compartments: Compartment[];
  shared: string[];
};

const priorityValueMap = new Map([[
  'a', 1
],
[
  'b', 2
],
[
  'c', 3
],
[
  'd', 4
],
[
  'e', 5
],
[
  'f', 6
],
[
  'g', 7
],
[
  'h', 8
],
[
  'i', 9
],
[
  'j', 10
],
[
  'k', 11
],
[
  'l', 12
],
[
  'm', 13
],
[
  'n', 14
],
[
  'o', 15
],
[
  'p', 16
],
[
  'q', 17
],
[
  'r', 18
],
[
  's', 19
],
[
  't', 20
],
[
  'u', 21
],
[
  'v', 22
],
[
  'w', 23
],
[
  'x', 24
],
[
  'y', 25
],
[
  'z', 26
],
[
  'A', 27
],
[
  'B', 28
],
[
  'C', 29
],
[
  'D', 30
],
[
  'E', 31
],
[
  'F', 32
],
[
  'G', 33
],
[
  'H', 34
],
[
  'I', 35
],
[
  'J', 36
],
[
  'K', 37
],
[
  'L', 38
],
[
  'M', 39
],
[
  'N', 40
],
[
  'O', 41
],
[
  'P', 42
],
[
  'Q', 43
],
[
  'R', 44
],
[
  'S', 45
],
[
  'T', 46
],
[
  'U', 47
],
[
  'V', 48
],
[
  'W', 49
],
[
  'X', 50
],
[
  'Y', 51
],
[
  'Z', 52
]
]);

export const rucksack = (input: string): RuckSack => {
  const isShared = new Map();
  const contents: string[] = input.split("");
  const compartments: Compartment[] = [];

  compartments.push(
    new Map(
      contents
        .slice(0, Math.round(contents.length / 2))
        .map((item) => [item, true])
    )
  );
  compartments.push(
    new Map(
      contents
        .slice(Math.round(contents.length / 2), contents.length)
        .map((item) => [item, true])
    )
  );

  Array.from(compartments[0].keys()).forEach((compartment: string) => {
    if (compartments[1].get(compartment)) {
      isShared.set(compartment, true);
    }
  });

  return {
    original: new Map(contents.map((item) => {return [item, true]})),
    compartments,
    shared: Array.from(isShared.keys()),
  };
};

export const rucksacks = (input: string[]): RuckSack[] => {
  return input.map((contents) => rucksack(contents));
};

export function solve(input: string[]) {
  const sacks = rucksacks(input);
  const priorityTotal = sacks.reduce((acc, sack) => {
    const shared = sack.shared[0];
    const priorityValue = priorityValueMap.get(shared);
    if(priorityValue){
      acc += priorityValue;
    }
    return acc;
  }, 0);

  return priorityTotal;
}


export function solvePart2(input: string[]) {
  const sacks = rucksacks(input);
  let buffer: RuckSack[] = [];
  console.log(`Sack Length ${sacks.length}`);

  const priorityTotals = sacks.reduce((acc, sack) => {
    console.log(`Buffer Length ${buffer.length}`);
    buffer.push(sack);

    if(buffer.length == 3){
      const shortest = buffer.sort((a, b) => {
        if(a.original.size > b.original.size){
          return 1;
        }
        if(a.original.size < b.original.size){
          return -1;
        }
        return 0;
      })[0];

      console.log(`KEYS: ${buffer.map((it) => (Array.from(it.original.keys()))).join('\n')}`);

      Array.from(shortest.original.keys()).forEach(element => {
        let isCommon = true;
        for (const bufSack of buffer) {
          if(!bufSack.original.has(element)){
            isCommon = false;
          }
        }

        if(isCommon){
          acc.push(element);
        }
      });
      buffer = [];
    }

    console.log(`ACC: ${acc}`);
    return acc;
  }, [] as string[]);
  const priorityTotal = priorityTotals.reduce((acc, val) => {
    const sackValue = priorityValueMap.get(val);
    if(sackValue){
      acc += sackValue;
    }
    return acc;
  }, 0);

  return priorityTotal;
}