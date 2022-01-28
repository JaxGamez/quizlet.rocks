<template>
  <v-snackbar :timeout="3000" :color="color" v-model="snackbar">
    {{ $globals.notification.text }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    snackbar: {
      get() {
        return this.$globals.notification.active;
      },
      set(value: boolean) {
        this.$globals.notification.active = value;
      }
    },
    color() {
      switch (this.$globals.notification.type) {
        case "ERROR":
          return "red";
        case "WARN":
          return "#FFC71E";
        default:
          return "green";
      }
    }
  }
});
</script>
