import type { Handbook, Program } from "@prisma/client";

import type { NodeType } from "components/Admin/Handbook/types";
import type { Message } from "./errorMessages";

export type ClientHandbook = Handbook & {
  type: NodeType;
  replaces?: number;
  // maxCredits?: number;
  // selectedCredits?: number;
  collection?: number;
  collectionChildren?: ClientHandbook[];
};

export type Sequence = {
  parent: Sequence | null;
  child?: Sequence | null | undefined;
  items: ClientHandbook[];
};

type SequenceItem = {
  code?: string;
  name?: string;
  credits?: number;
  text?: string;
};

export type Pathway = {
  name: string;
  credits: number;
  pathwayCount: number;
  sequence: SequenceItem[];
  message?: Message;
};

export type ProgramResult = {
  message: Message | undefined;
  pathways: Pathway[];
};

export type ProgramWithHandbook = Program & { handbook: ClientHandbook[] };

export type ProcessingState = {
  currentPathway: Pathway;
  pathways: Pathway[];
};
