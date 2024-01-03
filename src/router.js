import { createRouter, createWebHistory } from 'vue-router';

import ExampleForm from './components/ExampleForm.vue'
import ExampleEdit from './components/ExampleEdit.vue'
// import TemplateDashboard from './components/TemplateDashboard.vue'
import Login from './Login.vue'
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard', // Redirect to dashboard by default
            meta: { requiresAuth: true },
        },
        { 
            name: 'login',
            path: '/login', 
            component: Login,
            beforeEnter: (to, from, next) => {
                // Check authentication status
                if (store.getters.isLoggedIn) {
                  // If already logged in, redirect to dashboard
                  next('/dashboard');
                } else {
                  // If not logged in, proceed to the login page
                  next();
                }
            },
        },
        { 
            name: 'dashboard',
            path: '/dashboard', 
            components: { 
                default: ExampleForm
            },
            meta: { requiresAuth: true },
        },
        {   
            name: 'detail',
            path: '/dashboard/detail/:stateId', 
            components: { 
                default: ExampleEdit
            },
            props: true,
            meta: { requiresAuth: true },
        },
    ],
    linkActiveClass:'active',
    scrollBehavior (_, _2, savedPosition) {
        // console.log(to, from, savedPosition)
        if(savedPosition){
            return savedPosition
        }
        return { left: 0, top: 0 }
    }
})

router.beforeEach((to, _, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isLoggedIn = store.state.isLoggedIn;
  
    if (requiresAuth && !isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router