<template>
  <v-container class="ma-auto text-center">
    <h1 class="mx-auto sadWaitingNoises">Sad waiting noises{{ dots }}</h1>
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";

export default Vue.extend({
  name: "Lobby",
  data() {
    return {
      dots: "..."
    };
  },
  watch: {
    dots() {
      setTimeout(() => {
        if ((this as any).dots.length === 3) return ((this as any).dots = "");
        (this as any).dots += ".";
      }, 1000);
    }
  },
  mounted() {
    this.dots = ".";
  }
});
</script>

<style scoped>
.sadWaitingNoises {
  width: 300px;
  text-align: left;
}

@media only screen and (max-width: 350px) {
  .sadWaitingNoises {
    width: unset;
    text-align: center;
  }
}

@media only screen and (max-width: 320px) {
  .sadWaitingNoises {
    font-size: 30px;
  }
}
</style>
