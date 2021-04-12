import {createRouter, createWebHistory} from 'vue-router';
import store from './store/index.js';

// Coaches import
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

// Requests import
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

// User Auth import
import UserLogin from './pages/auth/UserLogin.vue';
import UserRegister from './pages/auth/UserRegister.vue';

// Not found import
import NotFound from './pages/NotFound.vue'; 



const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', redirect: '/coaches' },

        { path: '/coaches', component: CoachesList },

        { path: '/coaches/:id', component: CoachDetail, 
        props: true,
        children: [
            { path: 'contact', component: ContactCoach },
            ]
        },

        { path: '/register', component: CoachRegistration, meta: {requiresAuth: true} },

        { path: '/requests', component: RequestsReceived, meta: {requiresAuth: true} },

        {path: '/login', component: UserLogin, meta: {requiresUnauth: true} },
        {path: '/signup', component: UserRegister},

        { path: '/:notFound(.*)', component: NotFound },

    ]
});

    router.beforeEach(function(to,from,next) {
        if (to.meta.requiresAuth && !store.getters.isAuth) {
            next('/login');
        }
        else if(to.meta.requiresUnauth && store.getters.isAuth) {
            next('/coaches');
        }
        else {
            next();
        }
});

export default router;