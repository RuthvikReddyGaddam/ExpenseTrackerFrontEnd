import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import BaseCard from './components/ui/BaseCard.vue'
import BaseModal from './components/ui/BaseModal.vue'
import store from './store/index';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('base-card', BaseCard);
app.component('base-modal', BaseModal);
// app.component('base-button', BaseButton);
// app.component('base-badge', BaseBadge);
app.mount('#app');
