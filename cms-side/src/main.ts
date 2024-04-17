import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId: '928738064777-3fcusk6nmk88pknlmlr1i8nlvr9bceen.apps.googleusercontent.com'
});
app.use(createPinia());
app.use(router);

app.mount('#app');
