import { createRouter, createWebHistory} from 'vue-router';
import LoginComponent from "../components/LoginComponent.vue";
import MarketComponent from "../components/MarketComponent.vue";
import OrderVue from '../components/Order.vue';
import MyOrdersComponent from "../components/MyOrdersComponent.vue"
import MyTransactionsComponent from "../components/MyTransactionComponent.vue"

import { UserStore } from '../store/User';


const routes = [
    { path: "/", component: LoginComponent},
    { path: "/login", component: LoginComponent},
    { path: "/marketplace", component: MarketComponent,  meta: {requiresAuth: true}},
    { path: "/order", component: OrderVue,  meta: {requiresAuth: true}},
    { path: "/myorders", component: MyOrdersComponent,  meta: {requiresAuth: true}},
    { path: "/mytransactions", component: MyTransactionsComponent,  meta: {requiresAuth: true}}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})



router.beforeEach(async (to) => {
    const userStore = UserStore();
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!userStore.user.isLoggedIn) {
            return "/"
        }
    }
    else {
        if(userStore.user.isLoggedIn) {
            return "/marketplace"
        }
    }
  })

export default router;