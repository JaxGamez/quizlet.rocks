import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#4257B2",
        secondary: "#939BB4",
        accent: "#82B1FF",
        background: "#F6F7FB",
        secondaryBg: "#FFFFFF"
      },
      dark: {
        primary: "#4257B2",
        secondary: "#939BB4",
        accent: "#FF4081",
        background: "#13141b",
        secondaryBg: "#282E3E"
      }
    }
  }
});
