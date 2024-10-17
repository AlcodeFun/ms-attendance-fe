import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Vuex from 'vuex'

// Import Bootstrap and jQuery
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap CSS
import 'jquery/dist/jquery.min.js' // Import jQuery
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Import Bootstrap JS bundle which includes Popper.js

import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


 
/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/
 
Vue.use(Notifications)

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:5000'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false
Vue.use(Vuex)



Vue.use(VueSweetalert2);

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
