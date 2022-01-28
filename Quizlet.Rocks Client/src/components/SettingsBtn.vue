<template>
  <div>
    <v-btn
      @click="open = !open"
      fab
      dark
      color="primary"
      fixed
      right
      bottom
      class="btn-fix"
    >
      <v-icon color="#F6F7FB">mdi-cog-outline</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="open">
      <v-card
        :style="
          `background: ${$vuetify.theme.themes[theme].background}; height: 100%`
        "
        class="d-flex"
      >
        <div class="ma-auto" style="width: 750px">
          <div class="ad mx-auto my-6 d-flex">
            <div id="kahoot-rocks_728x90">
              <script type="application/javascript">
                aiptag.cmd.display.push(function() {
                  aipDisplayTag.display("kahoot-rocks_728x90");
                });
              </script>
            </div>

            <div id="kahoot-rocks_300x250">
              <script type="application/javascript">
                aiptag.cmd.display.push(function() {
                  aipDisplayTag.display("kahoot-rocks_300x250");
                });
              </script>
            </div>
          </div>
          <div class="ma-auto pb-12" id="inputs">
            <v-row no-gutters class="text-center px-12">
              <v-col class="d-flex flex-column">
                <v-switch
                  v-model="darkMode"
                  class="ma-auto"
                  :label="`Dark mode: ${boolToString(darkMode)}`"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-6 mx-1">
              <v-col>
                <v-text-field
                  v-model="minAnswerDelay"
                  :rules="numberRules"
                  class="ml-sm-5 lm-1 mr-2"
                  label="Min answer delay (ms)"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="maxAnswerDelay"
                  :rules="numberRules"
                  class="mr-sm-5 mr-1 ml-2"
                  label="Max answer delay (ms)"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                class="ma-2 white--text"
                color="primary"
                @click="open = !open"
                >Close</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      open: false,
      minAnswerDelay: 100,
      maxAnswerDelay: 100,
      numberRules: [
        (value: string) => {
          const regex = /^[0-9]*$/gm;
          return (
            regex.test(value) ||
            (value == "" || value == null ? true : "Has to be a number")
          );
        }
      ]
    };
  },
  watch: {
    open() {
      this.minAnswerDelay = this.$globals.options.answerDelay.min;
      this.maxAnswerDelay = this.$globals.options.answerDelay.max;
    },
    minAnswerDelay() {
      if (!isNaN(this.minAnswerDelay))
        this.$globals.options.answerDelay.min = Number(this.minAnswerDelay);
    },
    maxAnswerDelay() {
      if (!isNaN(this.maxAnswerDelay))
        this.$globals.options.answerDelay.max = Number(this.maxAnswerDelay);
    }
  },
  computed: {
    darkMode: {
      get() {
        return this.$globals.options.dark;
      },
      set(value: boolean) {
        this.$globals.options.dark = value;
        this.$vuetify.theme.dark = value;
      }
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  methods: {
    boolToString(input: boolean): string {
      return input ? "Enabled" : "Disabled";
    }
  }
});
</script>

<style scoped>
.btn-fix:focus::before {
  opacity: 0 !important;
}
.btn-fix:hover::before {
  opacity: 0.08 !important;
}
</style>
