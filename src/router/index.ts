import { createRouter, createWebHistory} from 'vue-router';
import LoginComponent from "../components/LoginComponent.vue";
import MarketComponent from "../components/MarketComponent.vue";
import { getCurrentUser } from '../services/UserService';
import { UserStore } from '../store/User';


const routes = [
    { path: "/", component: LoginComponent},
    { path: "/login", component: LoginComponent},
    { path: "/marketplace", component: MarketComponent,  meta: {requiresAuth: true}},
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})



router.beforeEach(async (to) => {
    const userStore = UserStore();
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!await getCurrentUser(userStore.user)) {
            return "/login"
        }
    }
    else {
        if(await getCurrentUser(userStore.user)) {
            return "/marketplace"
        }
    }



  })

export default router;