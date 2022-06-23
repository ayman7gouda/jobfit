import { expect } from 'expect';

import { createStructure } from '../testUtils';
import { expandCollections, generateSequence } from '../validator';

describe("expandCollections", function () {
  it("expands external major links for one collection", function () {
    let handbook = createStructure([
      {
        id: 1,
        type: "collection",
        text: "Majors",
        children: [
          {
            type: "link:major",
            selection: "OR",
            folder: true,
            number: 0,
            reference: 1,
          },
          {
            type: "link:major",
            selection: "OR",
            number: 0,
            folder: true,
            reference: 2,
          },
          {
            type: "link:major",
            selection: "OR",
            number: 0,
            folder: true,
            reference: 3,
          },
        ],
      },
      {
        text: "Year",
        type: "link:collection",
        reference: 1,
        number: 2,
      },
    ]);
    let sequence = generateSequence(handbook);
    expect(sequence).toHaveLength(1);

    let expanded = expandCollections(handbook);
    expect(expanded).toHaveLength(3);

    for (let version of expanded) {
      expect(version[0].collectionChildren).toHaveLength(8);
    }

    expect(expanded[0][0].collectionChildren![0].number).toBe(1);
    expect(expanded[0][0].collectionChildren![0].selection).toBe("OR");
    expect(expanded[0][0].collectionChildren![0].reference).toBe(1);
    expect(expanded[0][0].collectionChildren![0].type).toBe("link:major");
  });

  it("creates combinations of collection with external links", function () {
    let handbook = createStructure([
      {
        id: 10,
        type: "collection",
        text: "Majors",
        children: [
          {
            type: "link:major",
            selection: "OR",
            folder: true,
            number: 0,
            reference: 1,
          },
          {
            type: "link:major",
            selection: "OR",
            number: 0,
            folder: true,
            reference: 2,
          },
        ],
      },
      {
        id: 20,
        type: "collection",
        text: "Minors",
        children: [
          {
            text: "Minor 1",
            type: "link:minor",
            selection: "OR",
            folder: true,
            number: 0,
            reference: 1,
          },
          {
            text: "Minor 2",
            type: "link:minor",
            selection: "OR",
            number: 0,
            folder: true,
            reference: 2,
          },
        ],
      },
      {
        text: "Major",
        type: "link:collection",
        reference: 10,
        number: 2,
      },
      {
        text: "Minor",
        type: "link:collection",
        reference: 20,
        number: 2,
      },
    ]);
    let sequence = generateSequence(handbook);
    let expanded = expandCollections(handbook);

    expect(expanded).toHaveLength(4);

    for (let version of expanded) {
      expect(version[0].collectionChildren).toHaveLength(8); // major link
      expect(version[1].collectionChildren).toHaveLength(4); // minor link
    }

    expect(sequence).toHaveLength(1);
  });

  it("creates combinations of collection with subjects and external links", function () {
    let handbook = createStructure([
      {
        id: 10,
        type: "collection",
        text: "Core",
        children: [
          {
            type: "subject",
            subjectCode: "MATH1000",
          },
          {
            type: "subject",
            subjectCode: "MATH2000",
          },
        ],
      },
      {
        id: 20,
        type: "collection",
        text: "Electives",
        children: [
          {
            text: "Minor 1",
            type: "link:minor",
            selection: "OR",
            folder: true,
            number: 0,
            reference: 1,
          },
          {
            text: "Minor 2",
            type: "link:minor",
            selection: "OR",
            folder: true,
            number: 0,
            reference: 2,
          },
          {
            type: "subject",
            subjectCode: "MATH3000",
          },
        ],
      },
      {
        text: "Core",
        type: "link:collection",
        reference: 10,
        number: 2,
      },
      {
        text: "Electives",
        type: "link:collection",
        reference: 20,
        number: 2,
      },
    ]);
    let sequence = generateSequence(handbook);
    let expanded = expandCollections(handbook);

    expect(expanded).toHaveLength(2);

    for (let version of expanded) {
      expect(version[0].collectionChildren).toHaveLength(2); // major link
      expect(version[1].collectionChildren).toHaveLength(5); // minor link
    }
    expect(sequence).toHaveLength(1);
  });

  it("we can override number of linked items", function () {
    let handbook = createStructure([
      {
        id: 10,
        type: "collection",
        text: "Core",
        children: [
          {
            text: "Minor 1",
            type: "link:minor",
            selection: "OR",
            folder: true,
            number: 3,
            reference: 1,
          },
          {
            text: "Minor 2",
            type: "link:minor",
            selection: "OR",
            folder: true,
            number: 6,
            reference: 1,
          },
        ],
      },
      {
        text: "Core",
        type: "link:collection",
        reference: 10,
        number: 2,
      },
    ]);
    let sequence = generateSequence(handbook);
    let expanded = expandCollections(handbook);

    expect(expanded).toHaveLength(2);

    expect(expanded[0][0].collectionChildren).toHaveLength(3); // major link
    expect(expanded[1][0].collectionChildren).toHaveLength(6); // major link

    expect(sequence).toHaveLength(1);
  });

  it("maintains subject nodes", function () {
    let handbook = createStructure([
      {
        id: 10,
        type: "collection",
        text: "Core",
        children: [
          {
            type: "subject",
            subjectCode: "MATH1000",
          },
          {
            type: "subject",
            subjectCode: "MATH2000",
          },
        ],
      },
      {
        id: 20,
        type: "collection",
        text: "Core",
        children: [
          {
            type: "subject",
            subjectCode: "MATH1000",
          },
          {
            type: "subject",
            subjectCode: "MATH2000",
          },
        ],
      },
      {
        text: "Core",
        type: "link:collection",
        reference: 10,
        number: 2,
      },
      {
        text: "Core",
        type: "link:collection",
        reference: 20,
        number: 2,
      },
    ]);
    let sequence = generateSequence(handbook);
    let expanded = expandCollections(handbook);

    expect(expanded).toHaveLength(1);

    for (let version of expanded) {
      expect(version[0].collectionChildren).toHaveLength(2); // major link
      expect(version[1].collectionChildren).toHaveLength(2); // major link
    }
    expect(sequence).toHaveLength(1);
  });
});
