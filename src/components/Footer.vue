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
        :key="`${link.url}-footer-link`"
        color="secondary"
        text
        rounded
        class="my-2"

        href
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
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