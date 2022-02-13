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

    <v-overlay :value="showOverlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    
    <v-card width="40vw" class="mx-auto mt-5">
        <v-card-title class="d-flex justify-center">
            <h1>API Report</h1>
        </v-card-title>

        <v-card-text class="text-md-body-1 d-flex justify-center">
            This page reports data fetched via Studio Ghibli's Movies API.
        </v-card-text>
    </v-card>

    <v-card
        width="430px"
        class="mx-auto mt-5"
        v-if="apiReportFetched === true"
    >
        <v-card-title>
            <h3>Rotten Tomatoes Score color coding:</h3>
        </v-card-title>

        <v-card-text class="text-md-body-1 d-flex justify-center">
            <v-list shaped >
                <v-list-item single-line>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title> 
                            <v-chip color="green" class="d-flex justify-center">
                            85 - 100
                            </v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item single-line>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title> 
                            <v-chip color="orange" class="d-flex justify-center">
                            60 - 84
                            </v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item single-line>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title> 
                            <v-chip color="red" class="d-flex justify-center">
                            0 - 59
                            </v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>

    
    <v-card 
        id="overallTableCard"
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
            hide-default-footer
            disable-pagination

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
        id="groupTableCard"
        width="95vw" 
        class="ml-10 mb-5 mt-5 d-flex" 
        v-if="apiReportFetched === true"
    
        rounded
    >

        <v-card
            class="mx-auto"
            width="40vw"

            id="groupDirector"  

            data-aos="fade-right"
            
        >
            <v-card-title class="d-flex justify-center">
                <h1>Grouped by Directors</h1>
            </v-card-title>
        

            <v-data-table
                :headers="headers"
                :items="apiReportData"
                :search="search"
                multiSort
                class="elevation-1"

                hide-default-footer
                disable-pagination

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
        
        
        <v-card
            class="mx-auto"
            width="40vw"

            id="groupProducer"

            data-aos="fade-left"
        >
            <v-card-title class="d-flex justify-center">
                <h1>Grouped by Producers</h1>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="apiReportData"
                :search="search"
                multiSort
                class="elevation-1"
                group-by="producer" 

                hide-default-footer
                disable-pagination    
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
        showOverlay: true,
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
        ...mapGetters([
            "apiReportFetched", 
            "apiReportData", 
            "apiReportGroupedData"
            
            ])
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
            if (score >= 85) return "green"
            else if (score >= 60) return "orange"
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
                    document.getElementById("overallTableCard").style.opacity = "0";
                })
                .then(() => {
                    gsap.fromTo("#overallTableCard",
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
            .then(() => {
                this.showOverlay = false;
            })
        }
        else{
            this.showOverlay = false;
        }
    }
}
</script>

<style scoped>

    #errorMessage{
        opacity: 0;
        position: absolute;
    }

</style>