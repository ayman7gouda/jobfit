export enum HandbookErrorMessage {
  HandbookNotProcessed,
  CompulsoryRootNode,
}

export type Message = {
  code: number;
  message: string;
};

export function messages(code: HandbookErrorMessage) {
  let message = "";
  switch (code) {
    case HandbookErrorMessage.HandbookNotProcessed:
      message = "Program handbook not processed";
      break;
    case HandbookErrorMessage.CompulsoryRootNode:
      message = "Handbook must have exactly one root node";
      break;
  }
  return { code, message };
}
