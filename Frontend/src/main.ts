import { createApp } from "vue"
import { createPinia } from "pinia"
import { Quasar } from "quasar"
import "./style.css"
import router from "./router"

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css"
import "@quasar/extras/material-icons/material-icons.css"

// Import Quasar css
import "quasar/src/css/index.sass"

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue"

const pinia = createPinia()
const myApp = createApp(App)

myApp.use(pinia)
myApp.use(router)
myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app")
