<template>
  <v-app-bar
     app
     color="orange"
     dark  
    >

    <v-toolbar-title>Demo Pages v1</v-toolbar-title>

    <v-spacer></v-spacer>

     <v-btn
        v-for="(item, key) in links"
        :key="key"
        text
        color="black"
        rounded
     >
        {{ item }}
     </v-btn>

    </v-app-bar>
</template>

<script>
export default {
    props: {
        links: Array
    },

    data: () => ({
        
    })
}
</script>

<style>

</style>