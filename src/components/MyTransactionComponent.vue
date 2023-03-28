<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from './HeaderComponent.vue';
import { UserStore } from '../store/User';
import { getCurrentUser } from '../services/UserService';
import { IOrder } from '../contracts/IOrder';
import { getMarketplaceTransactions, getOrders, ORDER_STATUS } from '../services/OrderService';
import { ITransaction } from '../contracts/ITransaction';

const router = useRouter();
const route = useRoute();
const userStore = UserStore();
const myTransactions = ref<ITransaction[]>([]);
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
        .then(() => getMarketplaceTransactions().then(data => {
            if (data) {
                myTransactions.value = data
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
        <h1 class="text-rose-600 text-2xl font-bold my-3">Marketplace Transactions</h1>
        <div class="w-full overflow-hidden rounded-lg shadow-xs dark:bg-gray-800">
            <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap divide-y divide-gray-200 dark:divide-gray-600 overflow-y-hidden">
                    <thead>
                        <tr
                            class="text-xs font-medium tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <th class="px-4 py-3">Date</th>
                            <th lass="px-4 py-3">Order ID</th>
                            <th class="px-4 py-3">Amount</th>
                            <th class="px-4 py-3">Code</th>
                            <th class="px-4 py-3">PWD</th>
                        </tr>
                    </thead>
                    <tbody
                        class="bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        <tr class="text-gray-700 dark:text-gray-300" v-for="(orders, i) in myTransactions" :key="i">
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.createdAt }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.orderId }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.amount }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.code }}</td>
                            <td class="px-4 py-3 whitespace-no-wrap">{{ orders.pwd }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>