<template>
  <v-app>
    <c-navigation :links="links"/>    

    <v-content>
      <c-login/>
    </v-content>

    <c-footer :links="links"/>
    
  </v-app>
</template>

<script>

import CLogin from "@/components/Login.vue"
import CNavigation from "@/components/Navigation.vue"
import CFooter from "@/components/Footer.vue"

export default {
  name: 'App',

  components: {
    CLogin,
    CNavigation,
    CFooter
  },

  data: () => ({
    links: [
            "Home",
            "Login"
        ]
  }),
};
</script>
