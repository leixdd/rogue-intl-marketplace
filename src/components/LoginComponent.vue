<script setup lang="ts">

import { ref, onMounted } from "vue"
import { fetchCaptcha } from "../services/CaptchaService"
import { login, getCurrentUser } from "../services/UserService"
import { UserStore } from "../store/User";
import { ICaptchaRequest, ICaptcha } from "../contracts/ICaptcha";
import { IUserLoginCredentials } from "../contracts/IUser";
import bgMage from "../assets/bgMage.jpg"
import RogueLogo from "../assets/logo-rogue.png"
import Swal from "sweetalert2"
import router from "../router";

const userStore = UserStore();
const account = ref("")
const password = ref("")
const captcha = ref("")
const server = ref("SEA")
const imageData = ref("");
const isLoading = ref(false)

const refreshCaptcha = () => {
    fetchCaptcha({
        server: server.value,
        sx: userStore.user.phpsession
    } as ICaptchaRequest)
        .then((data: ICaptcha | null) => {
            imageData.value = data?.image || "";
        })
}

onMounted(() => {
    Promise.resolve()
        .then(() => isLoading.value = true)
        .then(() => getCurrentUser(userStore.user))
        .then(data => {
            if (data?.isLoggedIn) {
                router.push("/marketplace")
            }
        })
        .then(() => {
            fetchCaptcha({
                server: server.value,
                sx: userStore.user.phpsession
            } as ICaptchaRequest)
                .then((data: ICaptcha | null) => {
                    imageData.value = data?.image || "";
                })
        })
        .then(() => isLoading.value = false)

})

const submit = () => {
    login({
        server: "SEA",
        account: account.value,
        password: password.value,
        securitycode: captcha.value
    } as IUserLoginCredentials).then(data => {
        if (data) {
            userStore.setName(account.value)
            userStore.isLoggedIn = true
            router.push("/marketplace")
        }
        else {
            userStore.isLoggedIn = false;
            refreshCaptcha();
            Swal.fire("Login Failed", "Please check your inputs", "error");
        }
    })
}

</script>
<template>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <span class="loader" ></span>
    </div>
    <div class="bg-gray-900 text-white" v-else>

        <section class="relative flex flex-wrap lg:h-screen lg:items-center">
            <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div class="mx-auto max-w-lg text-center">
                    <img :src="RogueLogo" class="w-full" />

                    <p class="mt-4 text-gray-500">
                        Rogue International Marketplace
                    </p>
                </div>

                <form action="" class="mx-auto mt-8 mb-0 max-w-md space-y-4">
                    <div>
                        <div class="relative">
                            <label>Select Server</label>
                            <select class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
                                v-model="server" @change="refreshCaptcha">
                                <option value="SEA">SEA &amp; NA</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for="email">Username</label>

                        <div class="relative">
                            <input type="text"
                                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
                                placeholder="Enter username" v-model="account" />
                        </div>
                    </div>

                    <div>
                        <label for="password">Password</label>

                        <div class="relative">
                            <input type="password"
                                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
                                placeholder="Enter password" v-model="password" />

                            <span class="absolute inset-y-0 right-0 grid place-content-center px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label for="ss">Security Code</label>

                        <img :src="imageData" class="mb-3" @click="refreshCaptcha" />

                        <div class="relative">
                            <input type="text"
                                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
                                placeholder="Enter Security Code" v-model="captcha" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">
                            No account?
                            <a class="underline" href="https://rogueintl.com">Sign up</a>
                        </p>

                        <button type="button"
                            class="inline-block rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white"
                            @click="submit">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>

            <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img alt="Welcome" :src="bgMage" class="absolute inset-0 h-full w-full object-cover" />
            </div>
        </section>
    </div>
</template>