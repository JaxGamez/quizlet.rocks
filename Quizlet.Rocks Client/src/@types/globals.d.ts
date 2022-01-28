import { Socket } from "socket.io-client";
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $globals: {
      state: number;
      loading: boolean;
      options: {
        dark: boolean;
        answerDelay: {
          min: number;
          max: number;
        };
      };
      notification: {
        text: string;
        type: string;
        active: boolean;
      };
      socket: Socket;
      ShuffleArray(shuffle: any[]): any[];
      Notify(text: string, type: string);
      RemoveFormatCharacters(input: string): string;
      TruncateText(text: string, length: number): string;
    };
  }
}
