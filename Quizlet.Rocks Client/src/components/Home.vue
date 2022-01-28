<template>
  <v-container class="ma-auto text-center">
    <v-row style="margin-top: 20vh">
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
              v-model="username"
              @keyup.enter="JoinGame"
              autocomplete="off"
              label="Username"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="gamePin"
              :rules="numberRules"
              @keyup.enter="JoinGame"
              autocomplete="off"
              label="Game pin"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            class="text-center mx-auto"
            color="primary"
            large
            :loading="$globals.loading"
            @click="JoinGame"
            >Join game</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <div class="ad mx-auto mt-6 d-flex">
      <div
        id="kahoot-rocks_728x90"
        style="background-image: none;"
        class="mb-16"
      >
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
  name: "Home",
  data() {
    return {
      gamePin: "",
      username: "memes",
      numberRules: [
        (value: string) => {
          const regex = /^[0-9 -]*$/gm;
          return (
            regex.test(value) ||
            (value == "" || value == null ? true : "Has to be a number")
          );
        }
      ]
    };
  },
  async mounted() {
    this.username = await fetch("https://apis.kahoot.it/namerator")
      .then(res => res.json())
      .then(j => j.name);
  },
  methods: {
    async JoinGame() {
      this.$globals.loading = true;
      const gamePin = this.gamePin.replaceAll(" ", "").replaceAll("-", "");
      if (isNaN(Number(gamePin))) return (this.$globals.loading = false);
      if (this.username.length === 0) return (this.$globals.loading = false);
      const gameInstances = await this.$quizlet.GetGameInstances(
        Number(gamePin)
      );
      if (gameInstances.length === 0)
        return this.$globals.Notify("Incorrect game pin", "ERROR");
      this.$quizlet.JoinGame(gameInstances[0], this.username);
    }
  }
});
</script>
