import type { Handbook, Program } from "@prisma/client";

import type { NodeType } from "components/Admin/Handbook/types";
import { Message } from './errorMessages';

export type ClientHandbook = Handbook & { type: NodeType };

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
