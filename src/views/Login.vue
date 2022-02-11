<template>
  <v-card id="loginCard" width="30vw" class="mx-auto mt-5">
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Username" 
            prepend-icon="mdi-account-circle"
          />

          <v-spacer></v-spacer>

          <v-text-field 
            label="Password" 
            :type=" showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"

          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="success">Register</v-btn>

        <v-spacer></v-spacer>

        <v-btn color="info">Login</v-btn>
      </v-card-actions>
      
    </v-card>
</template>

<script>

import { gsap } from "gsap"

export default {
    data: () => ({
        showPassword: false
    }),

    mounted: function() {
      const tl = gsap.timeline();

      tl.add();

      tl.fromTo("#loginCard", 
          {y: "-120%", opacity: 0},
          {
            y: 0,
            opacity: 1,
            ease: "bounce.out",
            duration: 1
          }
        )
    }
}
</script>

<style>

</style>