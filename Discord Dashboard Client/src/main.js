import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/core/router';
import store from '@/core/store';
import axios from 'axios';

const app = createApp(App);

store.dispatch('getUser').then(async () => {
    router.beforeEach(async (to, from, next) => {
        if (to.path != from.path) {
            store.commit('updateLoading', true);
        }

        return next();
    });
    app.use(router);
    app.use(store);
    router.isReady().then(() => {
        app.mount('#app');
    });
});