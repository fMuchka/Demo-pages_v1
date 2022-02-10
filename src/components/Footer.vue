<template>
  <v-footer
    color="orange lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="black"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="black lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Demo Pages v1</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    props: {
        links: Array
    },

}
</script>

<style>

</style>