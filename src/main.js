import { createApp } from 'vue';

import router from './router';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
//import BaseLoading from './components/UI/BaseLoading.vue'
import BaseSpinner from './components/UI/BaseSpinner.vue';



const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);

app.use(router);
app.use(store);

app.mount('#app');