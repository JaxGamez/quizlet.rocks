<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <SettingsBtn></SettingsBtn>
    <Notification></Notification>
    <Home v-if="State === 0"></Home>
    <Lobby v-if="State === 1"></Lobby>
    <Playing v-if="State === 2"></Playing>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  computed: {
    State(): number {
      return this.$globals.state;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  methods: {
    getConfig() {
      const options = localStorage.getItem("options");
      if (options) {
        return JSON.parse(options);
      } else {
        console.log(
          `App.vue Line 27: ${JSON.stringify(this.$globals.options)}`
        );
        localStorage.setItem("options", JSON.stringify(this.$globals.options));
        return this.$globals.options;
      }
    },
    loadConfig() {
      const config = this.getConfig();
      this.$globals.options = Object.assign(this.$globals.options, config);
      this.$vuetify.theme.dark = this.$globals.options.dark;
    },
    CheckForAdblock() {
      fetch(
        " https://api.adinplay.com/libs/aiptag/pub/KHR/kahoot.rocks/tag.min.js"
      ).catch(() => {
        const style = document.createElement("style");
        style.innerHTML = `#kahoot-rocks_728x90{width:728px;height:90px;background-image:url("/${
          this.$vuetify.theme.dark ? "dark" : "light"
        }adblock728.png");}#kahoot-rocks_300x250{width:300px;height:250px;background-image:url("/${
          this.$vuetify.theme.dark ? "dark" : "light"
        }adblock300.png");}`;
        document.body.appendChild(style);
      });
    }
  },
  mounted() {
    this.loadConfig();
    this.CheckForAdblock();
  },
  components: {
    SettingsBtn: () => import("./components/SettingsBtn.vue"),
    Notification: () => import("./components/Notification.vue"),
    Home: () => import("./components/Home.vue"),
    Lobby: () => import("./components/Lobby.vue"),
    Playing: () => import("./components/Playing.vue")
  }
});
</script>

<style>
#kahoot-rocks_728x90,
#kahoot-rocks_300x250 {
  margin: auto;
}
@media only screen and (max-width: 850px) {
  #kahoot-rocks_300x250 {
    display: unset;
  }
  #kahoot-rocks_728x90 {
    display: none;
  }
}
@media only screen and (min-width: 850px) {
  #kahoot-rocks_300x250 {
    display: none;
  }
  #kahoot-rocks_728x90 {
    display: unset;
  }
}

*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
