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

<template>
  <router-view></router-view>
</template>
