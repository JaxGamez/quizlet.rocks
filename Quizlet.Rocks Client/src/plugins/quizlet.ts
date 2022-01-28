import { GameInstance, QuizletSocketError } from "vue/types/vue";
import { GameState, Term } from "../@types/gameState";
import { Question } from "../@types/question";
import { io, Socket } from "socket.io-client";
import _Vue from "vue";
import { AnswerResponse } from "@/@types/answerResponse";

export default {
  install: function(Vue: typeof _Vue) {
    Vue.prototype.$quizlet = new Vue({
      data() {
        return {
          currentGameState: {} as GameState,
          questionFormat: 1, // 1 = Answer with definition, 2 = answer with term,
          questionOrder: [] as Question[],
          questionIndex: -1,
          streak: 0,
          username: ""
        };
      },
      methods: {
        async JoinGame(gameDetails: GameInstance, username: string) {
          this.username = username;
          if (
            this.$globals.socket === null ||
            !this.$globals.socket.connected
          ) {
            const wsToken = await this.GetWebsocketToken();
            this.$globals.socket = io("https://quizlet.com", {
              path: `/multiplayer/${gameDetails.upstreamNumber}/${45000 +
                (gameDetails.gameVersion % 1000)}/${
                gameDetails.gameCode
              }/games/socket`,
              query: {
                gameId: gameDetails.gameCode.toString(),
                token: wsToken
              },
              reconnectionAttempts: 5,
              reconnectionDelay: 250,
              reconnectionDelayMax: 2000,
              timeout: 5000,
              forceNew: true
            });
            this.RegisterSocketEventHandlers(this.$globals.socket);
          } else
            setTimeout(() => {
              this.$globals.socket.emit("player-join", {
                username: this.username
              });
            }, 2000);
        },
        RegisterSocketEventHandlers(socket: Socket) {
          socket.on("connect", () =>
            setTimeout(() => {
              this.$globals.socket.emit("player-join", {
                username: this.username
              });
            }, 5000)
          );

          socket.on("game-error", (error: QuizletSocketError) => {
            switch (error.type) {
              case "ERROR_TYPES.DUPLICATE_PLAYER_NAME":
                this.$globals.Notify("Duplicate name", "ERROR");
                break;
              case "ERROR_TYPES.WRONG_GAME_STATE":
                this.$globals.Notify("Game already started", "ERROR");
                break;
              default:
                console.log(`Unknown socket error: ${JSON.stringify(error)}`);
                break;
            }
          });

          socket.on("current-game-state", (data: GameState) => {
            this.currentGameState = data;
            const latestState = data.statuses[data.statuses.length - 1];
            switch (latestState) {
              case "lobby":
              case "assign_teams":
              case "ready":
                this.$globals.state = 1;
                this.$globals.loading = false;
                this.questionFormat = data.options.promptWith;
                this.questionOrder = this.GetQuestionOrder(data.terms);
                break;
              case "playing":
                if (this.$globals.state !== 2) {
                  this.$globals.state = 2;
                  this.questionIndex = 0;
                }
                break;
            }
          });

          socket.on("matchteam.new-answer", (data: AnswerResponse) => {
            this.questionIndex++;
            if (!data.answer.isCorrect) {
              this.streak++;
            }
          });
        },
        GetQuestionOrder(terms: Term[]): Question[] {
          this.$globals.ShuffleArray(terms);
          const output = [];
          for (const el of terms) {
            let otherOptions = terms.filter(t => t !== el);
            this.$globals.ShuffleArray(otherOptions);
            otherOptions = otherOptions.slice(0, 3);
            otherOptions.push(el);
            this.$globals.ShuffleArray(otherOptions);
            output.push({
              correctIndex: otherOptions.indexOf(el),
              correctTerm: el.word,
              correctDefinition: el.definition,
              correctId: el.id,
              choices: otherOptions
            });
          }
          return output;
        },
        async GetWebsocketToken(): Promise<string> {
          const tokenRegExResult = await fetch(
            "https://proxy.quizlet.rocks/live"
          )
            .then(res => res.text())
            .then(h =>
              /(?<=("multiplayerToken":"))([a-z0-9-_]+\.)+([a-z0-9-_]+)/gim.exec(
                h
              )
            );
          return tokenRegExResult === null ? "ERROR" : tokenRegExResult[0];
        },
        async GetGameInstances(gameCode: number): Promise<Array<GameInstance>> {
          const filters = {
            gameCode,
            isInProgress: true,
            isDeleted: false
          };
          const gameInstances = await fetch(
            `https://proxy.quizlet.rocks/webapi/3.2/game-instances?filters=${encodeURIComponent(
              JSON.stringify(filters)
            )}&perPage=500`
          )
            .then(res => res.json())
            .then(j => j.responses[0].models.gameInstance);
          return gameInstances;
        },
        async GetRandomName(): Promise<string> {
          return await fetch("https://apis.kahoot.it/namerator")
            .then(res => res.json())
            .then(json => json.name);
        },
        AnswerQuestion(round: number) {
          this.$globals.socket.emit("matchteam.submit-answer", {
            round,
            streak: this.streak,
            termId: this.questionOrder[round].correctId
          });
        }
      },
      watch: {
        questionIndex() {
          setTimeout(() => {
            this.AnswerQuestion(this.questionIndex);
          }, 10000);
        }
      }
    });
  }
};
