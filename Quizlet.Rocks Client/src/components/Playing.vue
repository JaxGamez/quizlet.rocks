<template>
  <v-container class="ma-auto text-center" style="max-width: 1000px">
    <h1 style="margin-top:5vh">
      Quiz: {{ $quizlet.currentGameState.set.title }}
    </h1>
    <a
      :href="$quizlet.currentGameState.set._webUrl"
      target="_blank"
      style="display: block; margin-bottom: 3vh;"
      >Quiz Link</a
    >
    <div
      :style="
        `border-radius: 5px; background: ${$vuetify.theme.themes[theme].secondaryBg}`
      "
      v-for="(question, index) in $quizlet.questionOrder"
      v-bind:key="index"
      class="my-4"
    >
      <h3
        class="text-left pa-4"
        :style="$quizlet.questionIndex == index ? 'color: lime' : ''"
      >
        {{
          $quizlet.questionFormat === 1
            ? question.correctTerm
            : question.correctDefinition
        }}
      </h3>
      <div
        class="d-flex justify-space-around pb-2"
        style="height: 125px"
        v-if="!$vuetify.breakpoint.xs"
      >
        <div
          v-for="(choice, i) in question.choices"
          v-bind:key="i"
          id="mlgButton"
          :style="
            `border-color: ${$vuetify.theme.themes[theme].background}; color: ${
              question.correctIndex === i ? 'lime' : 'unset'
            }`
          "
          class="text-center d-flex flex-column"
        >
          <span
            class="ma-auto"
            style="width: 100%; word-wrap: break-word; text-overflow: ellipsis"
          >
            {{
              $globals.TruncateText(
                $quizlet.questionFormat === 1 ? choice.definition : choice.word,
                47
              )
            }}
          </span>
        </div>
      </div>
      <div
        class="d-flex justify-space-around"
        style="height: 125px"
        v-if="$vuetify.breakpoint.xs"
      >
        <div
          v-for="i in [0, 1]"
          v-bind:key="i"
          id="mlgButton"
          :style="
            `border-color: ${$vuetify.theme.themes[theme].background}; color: ${
              question.correctIndex === i ? 'lime' : 'unset'
            }`
          "
          class="text-center d-flex flex-column"
        >
          <span
            class="ma-auto"
            style="width: 100%; word-wrap: break-word; text-overflow: ellipsis"
          >
            {{
              $globals.TruncateText(
                $quizlet.questionFormat === 1
                  ? question.choices[i].definition
                  : question.choices[i].word,
                47
              )
            }}
          </span>
        </div>
      </div>
      <div
        class="d-flex justify-space-around pb-2"
        style="height: 125px"
        v-if="$vuetify.breakpoint.xs"
      >
        <div
          v-for="i in [2, 3]"
          v-bind:key="i"
          id="mlgButton"
          :style="
            `border-color: ${$vuetify.theme.themes[theme].background}; color: ${
              question.correctIndex === i ? 'lime' : 'unset'
            }`
          "
          class="text-center d-flex flex-column"
        >
          <p
            class="ma-auto"
            style="width: 100%; word-wrap: break-word; text-overflow: ellipsis"
          >
            {{
              $globals.TruncateText(
                $quizlet.questionFormat === 1
                  ? question.choices[i].definition
                  : question.choices[i].word,
                47
              )
            }}
          </p>
        </div>
      </div>
    </div>
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Playing",
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
});
</script>

<style scoped>
#mlgButton:nth-child(1),
#mlgButton:nth-child(2),
#mlgButton:nth-child(3) {
  border-right: 0.0625rem solid #000;
}

#mlgButton:nth-child(2),
#mlgButton:nth-child(3),
#mlgButton:nth-child(4) {
  border-left: 0.0625rem solid #000;
}

#mlgButton {
  width: 25%;
  height: 100%;
  border-top: 0.125rem solid;
  transition: color 0.15s;
}

@media only screen and (max-width: 600px) {
  #mlgButton:nth-child(1),
  #mlgButton:nth-child(2),
  #mlgButton:nth-child(3) {
    border-right: 0.0625rem solid #000;
  }

  #mlgButton:nth-child(2),
  #mlgButton:nth-child(3),
  #mlgButton:nth-child(4) {
    border-left: 0.0625rem solid #000;
  }

  #mlgButton {
    width: 50%;
    height: 100%;
    border-top: 0.125rem solid;
    transition: color 0.15s;
  }
}
</style>
