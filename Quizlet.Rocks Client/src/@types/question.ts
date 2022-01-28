import { Term } from "./gameState";

export interface Question {
  correctIndex: number;
  correctTerm: string;
  correctDefinition: string;
  correctId: number;
  choices: Term[];
}
