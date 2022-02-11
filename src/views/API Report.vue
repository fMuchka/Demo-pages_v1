<template>
  <div>

  </div>
</template>

<script>
import { MUTATIONS } from "@/store/mutations.type.ts";
import { mapGetters } from "vuex";

export default {
    name: "API Report",

    computed: {
        ...mapGetters(["apiReportFetched"])
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
                this.$store.commit(MUTATIONS.STORE_API_REPORT_DATA, result);
            })
        }
    }
}
</script>

<style>

</style>