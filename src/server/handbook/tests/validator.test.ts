import { expect } from 'expect';

import { HandbookErrorMessage, messages } from '../errorMessages';
import { hb } from '../testUtils';
import { generateSequence } from '../validator';

describe("Program Validator", function () {
  it("can only process processed handbook entries", async function () {
    expect(() => generateSequence(undefined as any)).toThrow(
      messages(HandbookErrorMessage.HandbookNotProcessed).message
    );

    expect(() => generateSequence([])).toThrow(
      messages(HandbookErrorMessage.HandbookNotProcessed).message
    );
  });

  it("handbook must have one root node", function () {
    expect(() => generateSequence([hb({ type: "folder" })])).toThrow(
      messages(HandbookErrorMessage.CompulsoryRootNode).message
    );

    expect(() =>
      generateSequence([
        hb({ parentId: 0, type: "folder", selection: "AND" }),
        hb({ parentId: 0, type: "folder", selection: "AND" }),
      ])
    ).toThrow(messages(HandbookErrorMessage.CompulsoryRootNode).message);

    let result = generateSequence([
      hb({ id: 1, parentId: 0, type: "folder", selection: "AND" }),
    ]);
    expect(result).toHaveLength(1);
  });
});
