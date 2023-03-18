<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import RogueLogo from "../assets/logo-rogue.png";
import { UserStore } from '../store/User';

const router = useRouter();
const route = useRoute();
const userStore = UserStore();

</script>
<template>
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
                    <a class="text-white" href="#" @click="router.push('/')">Order Points</a>
                    <a class="text-white" href="#" @click="router.push('/')">My Orders</a>
                </nav>

                <div class="hidden flex-1 items-center justify-end gap-4 sm:flex text-white">
                    {{ userStore.user.username }}
                    <a class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        href="#" @click="userStore.deleteSession()">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>