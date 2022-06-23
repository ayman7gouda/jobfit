import { expect } from 'expect';

import { createStructure } from '../testUtils';
import { expandOrNodes, expandSequence } from '../validator';

describe("expandOrNodes", function () {
  it("expands a simple selection by number", function () {
    let handbook = createStructure([
      {
        text: "Year",
        type: "folder",
        selection: "OR",
        number: 2,
        children: [
          {
            id: 1,
            type: "subject",
            subjectCode: "S1",
          },
          {
            id: 2,
            type: "subject",
            subjectCode: "S2",
          },
          {
            id: 3,
            type: "subject",
            subjectCode: "S3",
          },
        ],
      },
    ]);
    let sequence = expandOrNodes(handbook);
    expect(sequence).toHaveLength(3);

    let expanded = expandSequence(sequence[0]);
    expect(expanded).toHaveLength(3);
    expect(expanded[1].subjectCode).toEqual("S2");
    expect(expanded[2].subjectCode).toEqual("S3");

    expanded = expandSequence(sequence[1]);
    expect(expanded).toHaveLength(3);
    expect(expanded[1].subjectCode).toEqual("S1");
    expect(expanded[2].subjectCode).toEqual("S3");

    expanded = expandSequence(sequence[2]);
    expect(expanded).toHaveLength(3);
    expect(expanded[1].subjectCode).toEqual("S1");
    expect(expanded[2].subjectCode).toEqual("S2");
  });

  it("expands a simple selection by credits", function () {
    let handbook = createStructure([
      {
        text: "Year",
        type: "folder",
        selection: "OR",
        number: 30,
        children: [
          {
            id: 1,
            type: "subject",
            subjectCode: "S1",
            credits: 20,
          },
          {
            id: 2,
            type: "subject",
            subjectCode: "S2",
            credits: 10,
          },
          {
            id: 3,
            type: "subject",
            subjectCode: "S3",
          },
        ],
      },
    ]);
    let sequence = expandOrNodes(handbook);
    expect(sequence).toHaveLength(2);

    let expanded = expandSequence(sequence[0]);
    expect(expanded).toHaveLength(3);
    expect(expanded[1].subjectCode).toEqual("S1");
    expect(expanded[2].subjectCode).toEqual("S3");

    expanded = expandSequence(sequence[1]);
    expect(expanded).toHaveLength(3);
    expect(expanded[1].subjectCode).toEqual("S1");
    expect(expanded[2].subjectCode).toEqual("S2");
  });
});
