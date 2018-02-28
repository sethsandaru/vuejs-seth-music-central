// important library
import Vue from 'vue'
import VueRouter from 'vue-router';

// import the components for single page app
import HomePage from './components/pages/HomePage.vue';
import GenrePage from './components/pages/GenrePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import SearchPage from './components/pages/SearchPage.vue';


// define route
Vue.use(VueRouter);
export const router = new VueRouter({
    routes: [
        {
            path: '/', component: HomePage
        },
        {
            path: '/genre/:id', component: GenrePage
        },
        {
            path: '/login', component: LoginPage
        },
        {
            path: '/register', component: RegisterPage
        },
        {
            path: '/search', component: SearchPage
        }
    ]
});
