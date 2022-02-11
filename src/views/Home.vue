<template>
  <div>
    <v-card width="60vw" id="hello" class="ma-10">
      <v-card-title>
        <h1>Hello!</h1>
      </v-card-title>

      <v-card-text class="text-md-body-1">
        My name is <strong> Filip ".fm97" Muchka </strong>. I'm a self-taught
        front-end developer interested in

        <v-btn text href="https://vuejs.org/" target="_blank" color="green">
          Vue
          <v-icon> mdi-vuejs </v-icon>
        </v-btn>
        and everything connected to it.
        <br />
        Feel free to reach out to me on my 
        
        <v-btn text href="https://www.linkedin.com/in/filip-muchka-333401171/" target="_blank" color="blue">
          Linked-In
          <v-icon> mdi-linkedin </v-icon>
        </v-btn>

        or check out what I'm up to on my 

        <v-btn text href="https://github.com/fMuchka" target="_blank" color="purple">
          Git-Hub
          <v-icon> mdi-github </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card width="50vw" id="about" class="ma-10">
      <v-card-title>
        <h1>About these pages...</h1>
      </v-card-title>

      <v-card-text class="text-md-body-1">
        I've started working on these pages while doing VueMastery course on Vuetify.
        <br>
        At the time I was also thinking about creating some kind of playground, where I could practice various solutions to general problems. These pages are a showcase of that.
      </v-card-text>
    </v-card>

    <v-card width="30vw" id="libraries" min-width= "min-content" class="ma-10">
      <v-card-title>
        <h1>Major libraries used:</h1>
      </v-card-title>

      <v-card-text class="text-md-body-1">

        <v-list
            shaped
        >
            <v-list-item 
                v-for="item in libraries"
                :key="`${item.title}-library-title`"
                two-line

                :href="item.url"
                target="_blank"
            >
                <v-icon dense> mdi-open-in-new </v-icon>

                <v-list-item-content class="ml-5">
                    <v-list-item-title> {{ item.title }} </v-list-item-title>
                    <v-list-item-subtitle>{{ `"${item.desc}"` }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

      </v-card-text>
    </v-card>

    <v-card width="35vw" id="source" min-width= "fit-content" class="ma-10">
      <v-card-title>
        <h1>Source Code</h1>
      </v-card-title>

      <v-card-text class="text-md-body-1">
          You can find the Git-hub repo of these pages here
        <v-btn text href="https://github.com/fMuchka/Demo-pages_v1" target="_blank" color="purple">
          Source-Code
          <v-icon> mdi-github </v-icon>
        </v-btn>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import { gsap } from "gsap"

export default {
    name: "Home",
    data: () => ({

        libraries: [
            { title: "Vue.js (2.0)", desc: "The Progressive JavaScript Framework", url: "https://vuejs.org/" },
            { title: "Vuetify", desc: "Material Design Framework", url: "https://vuetifyjs.com/en/" },
            { title: "GSAP", desc: "Professional-grade JavaScript animation for the modern web", url: "https://greensock.com/gsap/" },
            { title: "TypeScript", desc: "JavaScript with syntax for types", url: "https://www.typescriptlang.org/" }
        ]
    }),

    mounted: function(){
      const tl = gsap.timeline();

      tl.add();

      tl.fromTo("#hello", 
        {x: "-120%", opacity: 0},
        {
          x: 0,
          opacity: 1,
          ease: "power1",
          duration: 1
        }
      )

      tl.add();

      tl.fromTo("#about", 
        {x: "-120%", opacity: 0},
        {
          x: 0,
          opacity: 1,
          ease: "power1",
          duration: 1
        },
        "-=0.25"
      )

      tl.add();

      tl.fromTo("#libraries", 
        {x: "-120%", opacity: 0},
        {
          x: 0,
          opacity: 1,
          ease: "power1",
          duration: 1
        },
        "-=0.25"
      )

      tl.add();

      tl.fromTo("#source", 
        {x: "-120%", opacity: 0},
        {
          x: 0,
          opacity: 1,
          ease: "power1",
          duration: 1
        },
        "-=0.25"
      )  
    }
};

</script>
