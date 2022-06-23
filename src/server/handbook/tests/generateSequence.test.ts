import { expect } from 'expect';
import { result } from 'lodash';

import { createStructure, hb, simplifySequence } from '../testUtils';
import { evaluateSequence, generateSequence, generateSequences } from '../validator';

describe("generateSequence", function () {
  // describe("checks validity of the structure", function() {
  //   it("collection cannot combine subjects and links", function() {

  //   });
  // });

  describe("handles collections by creating combination of elements", function () {});

  describe("generates flat representation of the sequence", function () {
    it("subject node adds credits to the pathway", async function () {
      const handbook = [
        hb({
          type: "subject",
          parentId: 4,
          subjectCode: "3",
          subjectName: "Name 3",
          index: 1,
        }),
        hb({
          type: "folder",
          folder: true,
          id: 3,
          parentId: 1,
          selection: "AND",
          text: "Autumn",
          index: 2,
        }),
        hb({
          type: "folder",
          folder: true,
          id: 1,
          parentId: 0,
          selection: "AND",
          text: "Year 1",
          index: 3,
        }),
        hb({
          type: "folder",
          folder: true,
          id: 4,
          parentId: 1,
          selection: "AND",
          text: "Spring",
          index: 4,
        }),
        hb({
          type: "subject",
          parentId: 3,
          subjectCode: "2",
          subjectName: "Name 2",
          index: 5,
        }),
        hb({
          type: "subject",
          parentId: 1,
          subjectCode: "1",
          subjectName: "Name 1",
          index: 6,
        }),
      ];
      let sequence = generateSequence(handbook);
      expect(sequence).toHaveLength(6);
      expect(
        sequence.map((r) => {
          let result: any = {};
          if (r.text) {
            result.text = r.text;
          }
          if (r.subjectCode) {
            result.code = r.subjectCode;
          }
          if (r.subjectName) {
            result.name = r.subjectName;
          }
          return result;
        })
      ).toEqual([
        { text: "Year 1" },
        { text: "Autumn" },
        { code: "2", name: "Name 2" },
        { text: "Spring" },
        { code: "3", name: "Name 3" },
        { code: "1", name: "Name 1" },
      ]);

      let evaluation = evaluateSequence(sequence, handbook);

      expect(evaluation.credits).toBe(30);
      expect(evaluation.combinations).toBe(1);
    });
  });

  it("OR node allows to select a subset of nodes, generating new pathways", async function () {
    let handbook = createStructure({
      text: "Year",
      selection: "AND",
      children: [
        {
          selection: "OR",
          number: 2,
          children: [
            { subjectCode: "1", type: "subject" },
            { subjectCode: "2", type: "subject" },
            { subjectCode: "3", type: "subject" },
          ],
        },
      ],
    });
    let sequence = generateSequence(handbook);
    expect(sequence).toHaveLength(2);

    let evaluation = evaluateSequence(sequence, handbook);

    expect(evaluation.credits).toBe(20);
    expect(evaluation.combinations).toBe(3);

    let pathways = generateSequences(sequence, handbook);

    expect(pathways).toHaveLength(3);
    expect(simplifySequence(pathways[2])).toEqual([
      { text: "Year" },
      { code: "1" },
      { code: "2" },
    ]);

    expect(simplifySequence(pathways[1])).toEqual([
      { text: "Year" },
      { code: "1" },
      { code: "3" },
    ]);

    expect(simplifySequence(pathways[0])).toEqual([
      { text: "Year" },
      { code: "2" },
      { code: "3" },
    ]);
  });

  it.skip("OR node allows to select a subset of nodes by number of credits, generating new pathways", async function () {
    let handbook = createStructure({
      text: "Year",
      selection: "AND",
      children: [
        {
          selection: "OR",
          number: 20,
          children: [
            { subjectCode: "1", type: "subject" },
            { subjectCode: "2", type: "subject" },
            { subjectCode: "3", type: "subject" },
          ],
        },
      ],
    });
    let sequence = generateSequence(handbook);
    expect(sequence).toHaveLength(2);

    let evaluation = evaluateSequence(sequence, handbook);

    expect(evaluation.credits).toBe(20);
    expect(evaluation.combinations).toBe(3);

    expect(result.pathways).toHaveLength(3);
    expect(result.pathways[0].credits).toBe(20);
    expect(result.pathways[1].credits).toBe(20);
    expect(result.pathways[2].credits).toBe(20);

    expect(result.pathways[0].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "1", name: null, credits: 10 },
      { code: "2", name: null, credits: 10 },
    ]);

    expect(result.pathways[1].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "1", name: null, credits: 10 },
      { code: "3", name: null, credits: 10 },
    ]);

    expect(result.pathways[2].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "2", name: null, credits: 10 },
      { code: "3", name: null, credits: 10 },
    ]);
  });

  it.skip("Collection nodes are not processed", async function () {
    let nodes = createStructure({
      text: "Year",
      selection: "AND",
      children: [
        {
          type: "collection",
          selection: "OR",
          number: 1,
          children: [{ subjectCode: "1", type: "subject" }],
        },
      ],
    });
    let result = await validateProgramNodes(nodes);
    expect(result.pathways[0].sequence).toEqual([{ text: "Year" }]);
  });
});
