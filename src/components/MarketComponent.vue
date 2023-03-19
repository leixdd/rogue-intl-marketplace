<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from './HeaderComponent.vue';
import { UserStore } from '../store/User';
import { getCurrentUser } from '../services/UserService';

const router = useRouter();
const route = useRoute();
const userStore = UserStore();

onMounted(() => {
    Promise.resolve()
    .then(() => getCurrentUser(userStore.user))
    .then(data => {
        if (!data) {
            router.push("/")
        }
    })
})
</script>
<template>
    <HeaderComponent />
</template>