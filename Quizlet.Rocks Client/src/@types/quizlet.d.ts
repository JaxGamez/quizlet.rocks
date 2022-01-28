import { GameState, Term } from "./gameState";
import { Question } from "./question";
import Vue from "vue";

declare module "vue/types/vue" {
  interface GameInstance {
    gameCode: number;
    gameVersion: number;
    id: number;
    isInProgress: boolean;
    itemId: number;
    itemType: number;
    lastModified: number;
    timestamp: number;
    upstreamNumber: number;
    userId: number;
  }

  interface QuizletSocketError {
    id: string;
    message: string;
    type: string;
  }

  interface Vue {
    $quizlet: {
      currentGameState: GameState;
      questionFormat: 1 | 2;
      questionOrder: Question[];
      questionIndex: number;
      streak: number;
      JoinGame(gameDetails: GameInstance, username: string);
      GetRandomName(): Promise<string>;
      GetGameInstances(gameCode: number): Promise<Array<GameInstance>>;
      GetWebsocketToken(): Promise<string>;
      GetQuestionOrder(terms: Term[]): Question[];
    };
  }
}
