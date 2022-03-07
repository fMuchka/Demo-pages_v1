<template>
  <v-container>

    <v-alert
        prominent
        outlined
        type="error"
        class="mt-5 d-flex align-center text-md-body-1"

        width="fit-content"
        style="z-index: 2"

        id="errorMessage"
    >
        API fetch not successful.

        <v-btn @click="hideError">Ok</v-btn>  
    </v-alert>

    <!-- Loader -->
    <v-overlay :value="showOverlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    
    <!-- Intro -->
    <v-row>
        <v-col cols="12">
            <v-card class="mx-auto mt-5">
                <v-card-title class="d-flex justify-center">
                    <h1>API Report</h1>
                </v-card-title>

                <v-card-text class="text-md-body-1 d-flex justify-center">
                    This page reports data fetched via &nbsp; <a href="https://ghiblicollection.com/" target="_blank">Studio Ghibli's</a> &nbsp; Movies API.
                </v-card-text>
            </v-card>
        </v-col>   
    </v-row>
    
    <!-- RT Scores -->
    <v-row>
        <v-col cols="12">
            <v-card
                class="mx-auto mt-5"
                v-if="apiReportFetched === true"
            >
                <v-card-title>
                    <h3>Rotten Tomatoes Score color coding:</h3>
                </v-card-title>

                <v-card-text class="text-md-body-1 d-flex justify-center">
                    <v-row>
                            <v-col cols="4">                  
                                <v-chip color="red" class="d-flex justify-center">
                                    0 - 59
                                </v-chip> 
                            </v-col>
                            
                            <v-col cols="4">                           
                                <v-chip color="orange" class="d-flex justify-center">
                                    60 - 84
                                </v-chip>                                     
                            </v-col>
                                
                            <v-col cols="4">
                                <v-chip color="green" class="d-flex justify-center">
                                    85 - 100
                                </v-chip>   
                            </v-col>              
                    </v-row>                 
                </v-card-text>
            </v-card>
        </v-col>  
    </v-row>
    
    <!-- Overview -->
    <v-row>
        <v-col cols="12">
            <v-card 
                id="overallTableCard"
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
        </v-col>    
    </v-row>

    <!-- Avg scores in Time -->
    <v-row>
        <v-card
            class="mx-auto text-center mb-5"
            width="100vw"

            data-aos="fade"
        >
            <v-card-title>
                <h1>Average Scores in Time</h1>
            </v-card-title>

            <v-col cols="12">
                <v-sparkline
                    :value="avgScoreArray"
                    :labels="avgScoreArrayYears"
                    auto-draw
                    padding="24"
                    stroke-linecap="round"
                    line-width="2"   
                    height="100"
                    label-size="5"
                    smooth
                >
                    <template v-slot:label="item">
                        {{ item.value }}
                    </template>
                </v-sparkline>
            </v-col>  
        </v-card>
    </v-row>
    
    <!-- Groups -->
    <v-row>
       <v-card 
            id="groupTableCard"
            class="mb-5 mt-5 d-flex" 
            v-if="apiReportFetched === true"

            color="secondary"
            rounded
        >
            <v-col cols="6">
                <v-card
                    class="mx-auto"
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
            </v-col>
            
            <v-spacer></v-spacer>

            <v-col cols="6">
                <v-card
                    class="mx-auto"
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
            </v-col>
            
            
        </v-card>
    </v-row>
    
    <!-- Avg scores -->
    <v-row>
        <v-card 
            id="byScoresTableCard"
            class="mx-auto mb-5 mt-5 d-flex" 
            v-if="apiScoreMap.directors.length > 0 && apiScoreMap.producers.length > 0"

            color="secondary"

            data-aos="fade-top"

            rounded
        >
            <v-col cols="6">
                <v-card
                    class="mx-auto"
                    id="directorScore"           
                >
                    <v-card-title class="d-flex justify-center">
                        <h1>Average Score by Director</h1>
                    </v-card-title>
                

                    <v-list shaped >
                        <v-list-item 
                            v-for="item in scoreSortedDirectors"
                            :key="`${item.person}-director`"
                            two-line
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center justify-space-between"> 

                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <div 
                                                class="scorePerson"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                {{ item.person }}
                                            </div>
                                        </template>
                                        <span>{{ item.person }}</span>
                                    </v-tooltip>
                                    

                                    <v-chip :color="getColor(item.avgScore)" class="d-flex justify-center">
                                    {{ Math.round(item.avgScore, 2) }}
                                    </v-chip>
                                </v-list-item-title>

                                <v-list-item-subtitle> Based on {{ item.sampleSize }} movies</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>             
                    </v-list>
                </v-card>
            </v-col>
            
            
            <v-col cols="6">
                <v-card
                    class="mx-auto"
                    id="producerScore"
                >
                    <v-card-title class="d-flex justify-center">
                        <h1 style="white-space: nowrap">Average Score by Producer</h1>
                    </v-card-title>

                    <v-list shaped >
                        <v-list-item 
                            v-for="item in scoreSortedProducers"
                            :key="`${item.person}-producer`"
                            two-line
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center justify-space-between"> 

                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <div 
                                                class="scorePerson"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                {{ item.person }}
                                            </div>
                                        </template>
                                        <span> 
                                            {{ item.person }}
                                        </span>
                                    </v-tooltip>

                                    <v-chip :color="getColor(item.avgScore)" class="d-flex justify-center">
                                    {{ Math.round(item.avgScore, 2) }}
                                    </v-chip>
                                </v-list-item-title>

                                <v-list-item-subtitle> Based on {{ item.sampleSize }} movies</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>             
                    </v-list>
                </v-card>
            </v-col>          
        </v-card>
    </v-row>
    

  </v-container>
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
            "apiReportGroupedData",
            "apiScoreMap",
            "avgScoreInTime"
            ]),

        scoreSortedDirectors(){
            let sorted = JSON.parse(JSON.stringify(this.apiScoreMap.directors));

            sorted.sort((a, b) => -1* (a.avgScore - b.avgScore));

            return sorted;
        },

        scoreSortedProducers(){
            let sorted = JSON.parse(JSON.stringify(this.apiScoreMap.producers));

            sorted.sort((a, b) => -1* (a.avgScore - b.avgScore));

            return sorted;
        },
        
        avgScoreArray(){
            return Array.from(this.avgScoreInTime.values(), value => value.avg)
        },

        avgScoreArrayYears(){
            return Array.from(this.avgScoreInTime.keys())
        }
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

    .scorePerson{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 10vw;
    }
</style>