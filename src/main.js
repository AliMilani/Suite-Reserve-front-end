import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css' //Vuesax styles

// import Tailwind Css
import './assets/css/tailwind.css'
import 'material-icons'

axios.defaults.baseURL = 'https://hungry-buck-nv69kpfte.iran.liara.run/api/v1'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vuesax, {
  rtl: true,
  theme: {
    colors: {
      success: '#0db02b'
    }
  }
})
app.mount('#app')
