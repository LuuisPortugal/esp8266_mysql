import {createRouter, createWebHashHistory} from 'vue-router';
import Dashboard from './components/Dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/valores',
        name: 'valores',
        component: () => import('./components/Valores.vue'),
    },
    {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import('./pages/CrudPino.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
