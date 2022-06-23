import { expect } from 'expect';

import { combinations } from '../shared';

describe("combinations", function () {
  it("creates combinations with credit limit", function () {
    let arr = [
      { credits: null },
      { credits: null },
      { credits: 10 },
      { credits: 20 },
      { credits: 30 },
    ];
    let combs = combinations(arr, 3);

    let result = [];
    for (let c of combs) {
      result.push(c);
    }
    expect(result).toHaveLength(10);
    arr = [
      { credits: null },
      { credits: 30 },
      { credits: null },
      { credits: 10 },
      { credits: 30 },
      { credits: 20 },
      { credits: 50 },
    ];
    // arr.sort((a, b) => ((a.credit || 0) < (b.credit || 0) ? 1 : -1));

    // combination of threes

    let combs1 = combinations(arr, 3, 30);

    let result1 = [];
    for (let c of combs1) {
      result1.push(c);
    }

    expect(result1).toHaveLength(6);
    expect(result1).toEqual([
      [{ credits: null }, { credits: null }, { credits: 10 }],
      [{ credits: null }, { credits: 20 }],
      [{ credits: 30 }],
      [{ credits: null }, { credits: 20 }],
      [{ credits: 10 }, { credits: 20 }],
      [{ credits: 30 }],
    ]);

    // combinations of twos

    let combs2 = combinations(arr, 2, 30);

    let result2 = [];
    for (let c of combs2) {
      result2.push(c);
    }

    expect(result2).toHaveLength(5);
    expect(result2).toEqual([
      [{ credits: null }, { credits: 20 }],
      [{ credits: 30 }],
      [{ credits: null }, { credits: 20 }],
      [{ credits: 10 }, { credits: 20 }],
      [{ credits: 30 }],
    ]);

    // combinations of fourd

    let combs4 = combinations(arr, 4, 30);

    let result4 = [];
    for (let c of combs4) {
      result4.push(c);
    }

    expect(result4).toHaveLength(6);
    expect(result4).toEqual([
      [{ credits: null }, { credits: null }, { credits: 10 }],
      [{ credits: null }, { credits: 20 }],
      [{ credits: 30 }],
      [{ credits: null }, { credits: 20 }],
      [{ credits: 10 }, { credits: 20 }],
      [{ credits: 30 }],
    ]);
  });

  it("sorts with 40 credits", function () {
    let arr = [
      { credits: null, id: 1 },
      { credits: 20, id: 2 },
      { credits: null, id: 3 },
      { credits: null, id: 4 },
      { credits: 30, id: 5 },
    ];
    // arr.sort((a, b) => ((a.credit || 0) < (b.credit || 0) ? 1 : -1));

    let combs1 = combinations(arr, 3, 40);

    let result1 = [];
    for (let c of combs1) {
      result1.push(c);
    }

    expect(result1).toHaveLength(6);
    expect(result1).toEqual([
      [
        { credits: null, id: 1 },
        { credits: 20, id: 2 },
        { credits: null, id: 3 },
      ],
      [
        { credits: null, id: 1 },
        { credits: 20, id: 2 },
        { credits: null, id: 4 },
      ],
      [
        { credits: null, id: 1 },
        { credits: 30, id: 5 },
      ],
      [
        { credits: 20, id: 2 },
        { credits: null, id: 3 },
        { credits: null, id: 4 },
      ],
      [
        { credits: null, id: 3 },
        { credits: 30, id: 5 },
      ],
      [
        { credits: null, id: 4 },
        { credits: 30, id: 5 },
      ],
    ]);
  });

  it("sorts with 30 credits", function () {
    let arr = [
      { credits: null, id: 1 },
      { credits: null, id: 2 },
      { credits: null, id: 3 },
      { credits: null, id: 4 },
    ];
    // arr.sort((a, b) => ((a.credit || 0) < (b.credit || 0) ? 1 : -1));

    let combs1 = combinations(arr, 4, 30);

    let result1 = [];
    for (let c of combs1) {
      result1.push(c);
    }

    expect(result1).toHaveLength(4);
    expect(result1).toEqual([
      [
        { credits: null, id: 1 },
        { credits: null, id: 2 },
        { credits: null, id: 3 },
      ],
      [
        { credits: null, id: 1 },
        { credits: null, id: 2 },
        { credits: null, id: 4 },
      ],
      [
        { credits: null, id: 1 },
        { credits: null, id: 3 },
        { credits: null, id: 4 },
      ],
      [
        { credits: null, id: 2 },
        { credits: null, id: 3 },
        { credits: null, id: 4 },
      ],
    ]);
  });
});
