import axios from 'axios';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import { vuetify } from '@/vuetify';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'vuetify/styles';

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/'; // the FastAPI backend

axios.interceptors.response.use(undefined, (error) => {
  if (error) {
    const originalRequest = error.config;
    const {
      statusText,
      data: { detail },
    } = error.response;
    const serverMessage = detail || statusText;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('logOut');
      return { success: false, data: serverMessage };
    }
    return { success: false, data: serverMessage };
  }
});

app.use(vuetify);
app.use(router);
app.use(store);
app.mount('#app');
