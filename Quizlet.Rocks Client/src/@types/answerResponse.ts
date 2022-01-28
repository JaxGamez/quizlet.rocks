export interface AnswerResponse {
  answer: {
    isCorrect: boolean;
    playerId: string;
    termId: number;
  };
  roundNum: number;
  streakNum: number;
}
