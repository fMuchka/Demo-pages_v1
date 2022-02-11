<template>
  <v-app-bar 
    app 
    dark 
    color="primary"

    hide-on-scroll  
  >
    <v-toolbar-title> Demo Pages v1 </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-switch 
        color="secondary" 
        class="pt-5"
        
        @click="toggleDarkMode"
        :value="$vuetify.theme.dark"
        
        
        append-icon="mdi-moon-waning-crescent"
        prepend-icon="mdi-white-balance-sunny"
    >
    </v-switch>


    <v-spacer></v-spacer>

    <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-menu </v-icon>
        </v-btn>
      </template>
      <v-list width="10vw">
        <v-list-item
          v-for="link in links"
          :key="`${link.url}-header-link`"
          
          href
          :to="link.url"
        >
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    links: Array,
  },

  methods: {
      toggleDarkMode() {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
          localStorage.setItem("dark_mode", this.$vuetify.theme.dark);
      }
  }

};
</script>

<style></style>
