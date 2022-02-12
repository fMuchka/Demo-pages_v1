<template>
  <div>

    <v-alert
        prominent
        outlined
        type="error"
        class="mx-auto mt-5 d-flex align-center text-md-body-1"

        width="fit-content"

        id="errorMessage"
    >
        API fetch not successful.

        <v-btn @click="hideError">Ok</v-btn>  
    </v-alert>
    
    <v-card width="40vw" class="mx-auto mt-5">
        <v-card-title class="d-flex justify-center">
            <h1>API Report</h1>
        </v-card-title>

        <v-card-text class="text-md-body-1 d-flex justify-center">
            This page reports data fetched via Studio Ghibli's Movies API.
        </v-card-text>
    </v-card>

    
    <v-card 
        id="overallTable"
        width="95vw" 
        class="mx-auto mb-5 mt-5" 
        v-if="apiReportFetched === true"

        rounded
    >
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="apiReportData"
            :search="search"
            multiSort
            class="elevation-1"
        >
            <template v-slot:item.rt_score="{ item }">
                <v-chip
                    :color="getColor(item.rt_score)"
                    dark
                >
                    {{ item.rt_score }}
                </v-chip>
            </template>
        </v-data-table>
    </v-card>
    

    <v-card 
        id="groupTable"
        width="95vw" 
        class="mx-auto mb-5 mt-5" 
        v-if="apiReportFetched === true"

        rounded
    >
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="apiReportData"
            :search="search"
            multiSort
            class="elevation-1"
            group-by="director"     
        >
            <template v-slot:item.rt_score="{ item }">
                <v-chip
                    :color="getColor(item.rt_score)"
                    dark
                >
                    {{ item.rt_score }}
                </v-chip>
            </template>
        </v-data-table>
    </v-card>

  </div>
</template>

<script>
import { ACTIONS } from "@/store/actions.type.ts";
import { mapGetters } from "vuex";

import { gsap } from "gsap"

let tl = gsap.timeline();

export default {
    name: "API-Report",

    data: () => ({
        search: "",
        headers: [
            { text: "Title", value: "title" },
            { text: "Director", value: "director" },
            { text: "Producer", value: "producer" },
            { text: "Release Date", value: "release_date" },
            { text: "Rotten Tomatoes Score", value: "rt_score" }
        ]
    }),

    computed: {
        ...mapGetters(["apiReportFetched", "apiReportData"])
    },

    methods: {
        hideError(){
            tl.add();

            tl.to("#errorMessage",
                {
                    y: "-120%",
                    opacity: 0,
                    ease: "bounce.out",
                    duration: 0.25
                }
            )
        },

        getColor(score){
            if (score > 85) return "green"
            else if (score > 60) return "orange"
            else return "red"
        },
    },

    mounted: function () {
        if (this.apiReportFetched === false) {
            const url = "https://ghibliapi.herokuapp.com/films";

            fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                this.$store.dispatch(ACTIONS.STORE_API_REPORT_DATA, result)
                .then(() => {                 

                    gsap.fromTo("#dataTable",
                        { opactiy: 0 },
                        {
                            opacity: 1,
                            ease: "bounce.out",
                            duration: 1
                        }
                    )
                })
                    
            })
            .catch(() => {
                tl.add();

                tl.fromTo("#errorMessage",
                    { y: "-120%", opactiy: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "bounce.out",
                        duration: 1
                    }
                )
            })
        }
    }
}
</script>

<style scoped>

    #errorMessage{
        opacity: 0;
        position: absolute;
    }

    #dataTable{
        opacity: 0;
    }

    .v-row-group__header  button:nth-child(2) {
    display: none !important;
}
</style>