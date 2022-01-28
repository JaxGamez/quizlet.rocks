import Vue from "vue";

export default {
  install: function(MainVue: typeof Vue) {
    MainVue.prototype.$globals = new Vue({
      data() {
        return {
          state: 0,
          loading: false,
          socket: null,
          options: {
            dark: false,
            answerDelay: {
              min: 100,
              max: 100
            }
          },
          notification: {
            text: "",
            type: "",
            active: false
          }
        };
      },
      methods: {
        ShuffleArray(shuffle: []) {
          for (let i = shuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
          }
        },
        Notify(text: string, type: string) {
          this.loading = false;
          this.notification.text = text;
          this.notification.type = type;
          this.notification.active = true;
        },
        RemoveFormatCharacters(input: string): string {
          return input
            .replace(/(&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});)+/gi, " ")
            .replace(/<[^>]*>/g, " ")
            .replace(/ {2,}/g, " ");
        },
        TruncateText(text: string, length: number): string {
          if (text.length <= length) {
            return text;
          }
          return text.substr(0, length) + "\u2026";
        }
      },
      watch: {
        options: {
          handler() {
            localStorage.setItem("options", JSON.stringify(this.options));
          },
          deep: true
        }
      }
    });
  }
};
