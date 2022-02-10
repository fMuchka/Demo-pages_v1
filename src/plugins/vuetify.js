import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: "#EB5E28",
                secondary: "#252422",
                accent: "403D39",
                
                error: "BD2121",
                success: "21961f",
                info: "DA7A30"
            },
            light: {
                primary: "#3290CF",
                secondary: "#FFFCF2",
                accent: "BBB5A8",
                
                error: "BD2121",
                success: "21961f",
                info: "DA7A30"
            },
        },
  }
    
});
