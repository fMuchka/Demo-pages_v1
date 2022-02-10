<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="secondary"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="accent lighten-2 py-4 text-center"
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