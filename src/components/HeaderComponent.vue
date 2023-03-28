<script setup lang="ts">
import {ref} from "vue"
import { useRoute, useRouter } from 'vue-router';
import RogueLogo from "../assets/logo-rogue.png";
import { UserStore } from '../store/User';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

const router = useRouter();
const route = useRoute();
const userStore = UserStore();

const dialogControl = ref(false)
</script>
<template>
    <Dialog :open="dialogControl" @close="dialogControl = false" class="relative z-50">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center p-4">
            <!-- The actual dialog panel -->
            <DialogPanel class="w-full max-w-sm rounded bg-white p-5" style="height: 80vh">
                <DialogTitle>
                    <h2><strong>Navigation</strong></h2>
                </DialogTitle>
                <DialogDescription>
                    <hr class="my-2" />

                    <button class="text-white bg-rose-500 p-3 rounded w-full my-2" href="#" @click="router.push('/marketplace')">Marketplace</button>
                    <br/>
                    <button class="text-white bg-rose-500 p-3 rounded w-full my-2" href="#" @click="router.push('/mytransactions')">My Transactions</button>
                    <br/>
                    <button class="text-white bg-rose-500 p-3 roundedk w-full my-2" href="#" @click="router.push('/order')">Order Points</button>
                    <br/>
                    <button class="text-white bg-rose-500 p-3 rounded w-full my-2" href="#" @click="router.push('/myorders')">My Orders</button>
                    <br/>
                    <a class="text-white bg-rose-500 p-3 rounded block w-full my-2" href="https://rogueintl.com/recharge" target="_blank">Game Recharge</a>
                    <a class="text-white bg-rose-500 p-3 rounded block w-full my-2" href="https://rogueintl.com/terms" target="_blank">ToS</a>
                    <button class="text-white bg-rose-500 p-3 rounded block w-full my-2" href="#" @click="userStore.deleteSession()">Logout</button>

                    <button @click="dialogControl = false"
                        class="mt-12 block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                        Close
                    </button>
                </DialogDescription>
            </DialogPanel>
        </div>
    </Dialog>

    <header aria-label="Site Header" class="shadow-sm sticky top-0 z-50 bg-black/50">
        <div class="mx-auto max-w-screen-xl p-4">
            <div class="flex items-center justify-between gap-4 lg:gap-10">
                <div class="flex lg:w-0 lg:flex-1">
                    <a href="#">

                        <img :src="RogueLogo" alt="Rogue International" class="mx-auto h-12 w-auto" />
                    </a>
                </div>

                <nav aria-label="Site Nav" class="hidden gap-8 text-sm font-medium sm:flex">
                    <a class="text-white" href="#" @click="router.push('/marketplace')">Marketplace</a>
                    <a class="text-white" href="#" @click="router.push('/mytransactions')">My Transactions</a>
                    <a class="text-white" href="#" @click="router.push('/order')">Order Points</a>
                    <a class="text-white" href="#" @click="router.push('/myorders')">My Orders</a>
                    <a class="text-white" href="https://rogueintl.com/recharge" target="_blank">Game Recharge</a>
                    <a class="text-white" href="https://rogueintl.com/terms" target="_blank">ToS</a>
                </nav>

                <div class="hidden flex-1 items-center justify-end gap-4 sm:flex text-white">
                    {{ userStore.user.username }}
                    <a class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        href="#" @click="userStore.deleteSession()">
                        Logout
                    </a>
                </div>

                <div class="flex flex-1 items-center justify-end gap-4 sm:hidden text-white">
                    <a class="rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        href="#" @click="dialogControl = true">
                        Menu
                    </a>
                </div>
            </div>
        </div>
    </header> 
</template>