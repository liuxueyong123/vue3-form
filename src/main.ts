import { createApp } from 'vue'
// import App from './App'
import TestApp from './test'

const app = createApp(TestApp)

// handle error
app.config.errorHandler = (err) => {
  alert(err)
}

app.mount('#app')
