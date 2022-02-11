<template>
  <v-app>
    <c-navigation :links="links" />

    <v-content background="primary">
      <router-view></router-view>
    </v-content>

    <c-footer :links="links" />
  </v-app>
</template>

<script>
import CNavigation from "@/components/Navigation.vue";
import CFooter from "@/components/Footer.vue";

export default {
  name: "App",

  components: {
    CNavigation,
    CFooter,
  },

  data: () => ({
    links: [
      { label: "Home", url: "/" },
      { label: "Login", url: "/login" },
      { label: "API Report", url: "/api_report" }
      ],
  }),

  mounted() {
    const theme = localStorage.getItem("dark_mode");

    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  }
};
</script>
