<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import { getCurrentUser } from "./services/UserService"
import { IUser } from "./contracts/IUser"
import { onMounted } from "vue";

import { UserStore } from "./store/User"

const router = useRouter();
const route = useRoute();

onMounted(() => {

})
</script>

<style>
body {
    background-color: rgba(17, 24, 39, 1);
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #ff0055;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
<template>
  <router-view></router-view>
</template>
