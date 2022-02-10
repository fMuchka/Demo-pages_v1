<template>
  <v-app-bar app color="primary">
    <v-toolbar-title> Demo Pages v1 </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                icon 
                color="secondary" 
                @click="changeTheme"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon v-if="darkTheme === false"> mdi-moon-waning-crescent </v-icon>

                <v-icon v-else> mdi-white-balance-sunny </v-icon>
            </v-btn>
        </template>
      <span v-if="darkTheme === false">Dark Mode</span>
      <span v-else>Light Mode</span>
    </v-tooltip>

    <v-spacer></v-spacer>

    <v-btn
      v-for="(item, key) in links"
      :key="key"
      text
      color="secondary"
      rounded
    >
      {{ item }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    links: Array,
  },

  data: () => ({
    darkTheme: false,
  }),

  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.darkTheme = !this.darkTheme;
    },
  },
};
</script>

<style></style>
