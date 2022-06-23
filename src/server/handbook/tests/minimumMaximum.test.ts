import { expect } from 'expect';

import { createStructure } from '../testUtils';
import {
  expandCollections, expandMinimumMaximum, expandSequence, processMinimumMaximum
} from '../validator';

describe("processMinimumMaximum", function () {
  it("generates combinations of possibilities", function () {
    let options = processMinimumMaximum(
      [
        { min: 0, max: 3 },
        { min: 0, max: 8 },
        { min: 3, max: 8 },
      ],
      0,
      8
    );
    expect(options).toEqual([
      [0, 0, 8],
      [0, 1, 7],
      [0, 2, 6],
      [0, 3, 5],
      [0, 4, 4],
      [0, 5, 3],
      [1, 0, 7],
      [1, 1, 6],
      [1, 2, 5],
      [1, 3, 4],
      [1, 4, 3],
      [2, 0, 6],
      [2, 1, 5],
      [2, 2, 4],
      [2, 3, 3],
      [3, 0, 5],
      [3, 1, 4],
      [3, 2, 3],
    ]);
  });
});

describe("expandMinimumMaximum", function () {
  it("replaces collection links", function () {
    let handbook = createStructure([
      {
        id: 10,
        type: "collection",
        text: "Majors",
        children: [
          {
            type: "subject",
            level: 1,
          },
          {
            type: "subject",
            level: 1,
          },
          {
            type: "subject",
            level: 1,
          },
          {
            type: "subject",
            level: 1,
          },
          {
            type: "subject",
            level: 2,
          },
          {
            type: "subject",
            level: 2,
          },
          {
            type: "subject",
            level: 2,
          },
          {
            type: "subject",
            level: 2,
          },
          {
            type: "subject",
            level: 3,
          },
          {
            type: "subject",
            level: 3,
          },
          {
            type: "subject",
            level: 3,
          },
          {
            type: "subject",
            level: 3,
          },
          {
            type: "subject",
            level: 3,
          },
          {
            type: "subject",
            level: 3,
          },
        ],
      },
      {
        text: "6 of",
        type: "folder",
        selection: "OR",
        parentId: 0,
        number: 6,
        id: 2,
        children: [
          {
            text: "Max 3 Level 1s",
            type: "link:collection",
            reference: 10,
            selection: "OR",
            level: 1,
            number: 0,
            maxNumber: 3,
          },
          {
            text: "Min 3 Level 3s",
            type: "link:collection",
            reference: 10,
            selection: "OR",
            level: 3,
            number: 3,
            maxNumber: 0,
          },
          {
            text: "Max 3 Level 1s",
            type: "link:collection",
            reference: 10,
            selection: "OR",
            level: 2,
            number: 0,
            maxNumber: 6,
          },
        ],
      },
    ]);
    // let sequence = generateSequence(handbook);
    let expanded = expandCollections(handbook);

    let sequences = expandMinimumMaximum(
      {
        parent: null,
        items: handbook,
      },
      expanded[0]
    );

    expect(sequences).toHaveLength(10);

    expect(
      expandSequence(sequences[0], true).filter((f) => f.parentId === -1)
    ).toEqual([
      { id: 10, nodeId: 0, parentId: -1, text: "Majors", type: "collection" },
      {
        id: 100000,
        level: 3,
        nodeId: 100000,
        number: 1,
        parentId: -1,
        reference: 10,
        replaces: 2,
        selection: "OR",
        text: "Min 3 Level 3s",
        type: "link:collection",
      },
      {
        id: 100001,
        level: 3,
        nodeId: 100001,
        number: 1,
        parentId: -1,
        reference: 10,
        replaces: 2,
        selection: "OR",
        text: "Min 3 Level 3s",
        type: "link:collection",
      },
      {
        id: 100002,
        level: 3,
        nodeId: 100002,
        number: 1,
        parentId: -1,
        reference: 10,
        replaces: 2,
        selection: "OR",
        text: "Min 3 Level 3s",
        type: "link:collection",
      },
      {
        id: 100003,
        level: 2,
        nodeId: 100003,
        number: 1,
        parentId: -1,
        reference: 10,
        replaces: 2,
        selection: "OR",
        text: "Max 3 Level 1s",
        type: "link:collection",
      },
      {
        id: 100004,
        level: 2,
        nodeId: 100004,
        number: 1,
        parentId: -1,
        reference: 10,
        replaces: 2,
        selection: "OR",
        text: "Max 3 Level 1s",
        type: "link:collection",
      },
      {
        id: 100005,
        level: 2,
        nodeId: 100005,
        number: 1,
        parentId: -1,
        reference: 10,
        replaces: 2,
        selection: "OR",
        text: "Max 3 Level 1s",
        type: "link:collection",
      },
    ]);
  });
});
