<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from './HeaderComponent.vue';
import { UserStore } from '../store/User';
import { getCurrentUser } from '../services/UserService';
import { IOrder } from '../contracts/IOrder';
import { getOrders, ORDER_STATUS } from '../services/OrderService';

const router = useRouter();
const route = useRoute();
const userStore = UserStore();
const myOrders = ref<IOrder[]>([]);
const isLoading = ref(false)


onMounted(() => {
    Promise.resolve()
        .then(() => isLoading.value = true)
        .then(() => getCurrentUser(userStore.user))
        .then(data => {
            if (!data) {
                router.push("/")
            }
        })
        .then(() => getOrders().then(data => {
            if (data) {
                myOrders.value = data
            }
        }))
        .then(() => isLoading.value = false)
})

</script>

<template>
    <HeaderComponent />
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <span class="loader" ></span>
    </div>
    <div class="w-11/12 mx-auto mt-5" v-else>
        <h1 class="text-rose-600 text-2xl font-bold my-3">My Orders</h1>
        <div class="w-full overflow-hidden rounded-lg shadow-xs dark:bg-gray-800">
            <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap divide-y divide-gray-200 dark:divide-gray-600 overflow-y-hidden">
                    <thead>
                        <tr
                            class="text-xs font-medium tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <th class="px-4 py-3">Date</th>
                            <th class="px-4 py-3">Order</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Remarks</th>
                        </tr>
                    </thead>
                    <tbody
                        class="bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        <tr class="text-gray-700 dark:text-gray-300" v-for="(orders, i) in myOrders" :key="i">
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.createdAt }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.amount }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ ORDER_STATUS[orders.orderStatus] }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.remarks }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>