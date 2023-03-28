<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from './HeaderComponent.vue';
import { UserStore } from '../store/User';
import { getCurrentUser } from '../services/UserService';
import Swal from 'sweetalert2';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

import { loadScript, PayPalButtonsComponent, PayPalButtonsComponentOptions, PayPalNamespace } from "@paypal/paypal-js"
import { processExpression } from '@vue/compiler-core';

interface IItem {
    name: string;
    description: string;
    price: number;
    image: string;
    code: string;
    createdAt?: Date;
    updatedAt?: Date;
    active: boolean;
}


const router = useRouter();
const route = useRoute();
const userStore = UserStore();

const API_SERVER = ref(import.meta.env.VITE_API_URL);
const isDialogOpen = ref(false)
const targetItem = ref<IItem | null>(null);
const paypalInstance = ref<PayPalNamespace | null>(null);
const itemList = reactive<IItem[]>([]);


const getItems = async () => {
    await fetch(`${API_SERVER.value}/api/v1/rint/market/list`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            Object.assign(itemList, data.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

const setOpenDialog = (dialog: boolean, target: IItem | null) => {
    isDialogOpen.value = dialog
    targetItem.value = target

    if (targetItem.value) {

        loadScript({
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            "currency": "PHP",
            "components": "funding-eligibility,buttons,messages",
            commit: false,
        }).then((paypal) => {

            // @ts-ignore
            paypal.Buttons({
                style: {
                    layout: 'horizontal',
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay',
                    tagline: false,

                },

                createOrder: (data, actions) => {
                    return fetch(`${API_SERVER.value}/api/v1/rint/paypal/createOrder`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            items: [targetItem.value],
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                return data.data.orderID;
                            }
                            else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: data.data,
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                })
                            }
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                },

                onApprove: (data, actions) => {
                    return fetch(`${API_SERVER.value}/api/v1/rint/paypal/executeOrder`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orderID: data.orderID,
                            account: userStore.user.username
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            if (data.success) {
                                router.push('/')
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Your order has been placed!',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                })
                            }
                            else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: data.data,
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                })
                                window.location.reload();
                            }


                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            }).render('#paypal-button-container')

        })
    }
}

onMounted(() => {
    Promise.resolve()
        .then(() => getCurrentUser(userStore.user))
        .then(data => {
            if (!data) {
                router.push("/")
            }
        })
        .then(() => {
            getItems()
        })
})
</script>
<template>
    <HeaderComponent />
    <Dialog :open="isDialogOpen" @close="setOpenDialog(false, null)" class="relative z-50">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center p-4">
            <!-- The actual dialog panel -->
            <DialogPanel class="w-full max-w-sm rounded bg-white p-5" style="height: 50vh">
                <DialogTitle>
                    <h2><strong>{{ targetItem?.name }}</strong></h2>
                </DialogTitle>
                <DialogDescription>
                    <hr class="my-2" />

                    <h3>Price: {{ targetItem?.price }}</h3>
                    <br />
                    <p class="text-justify">
                        Please review the <b class="text-rose-600"><a href="https://rogueintl.com/terms" target="_blank">Terms and Conditions</a></b> before proceeding with your payment.
                        Thank you very much
                    </p>

                    <br />
                    <br />
                    <br />

                    <div id="paypal-button-container"></div>

                    <button @click="setOpenDialog(false, null)"
                        class="mt-12 block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                        Close
                    </button>
                </DialogDescription>
            </DialogPanel>
        </div>
    </Dialog>

    <div class="grid grid-cols-4 gap-4 m-5">
        <div v-for="(item, i) in itemList" :key="item.code">
            <div class="group relative block overflow-hidden" v-if="item.active">
                <img :src="item.image" alt=""
                    class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />

                <div class="relative border border-gray-100 bg-white p-6">
                    <span class="whitespace-nowrap text-white bg-rose-600 px-3 py-1.5 text-xs font-medium">
                        New
                    </span>

                    <h3 class="mt-4 text-lg font-medium text-gray-900">{{ item.name }}</h3>

                    <p class="mt-1.5 text-sm text-gray-700">PHP {{ item.price }}</p>

                    <div class="mt-4">
                        <button type="button"
                            class="block w-full rounded bg-rose-600 text-white p-4 text-sm font-medium transition hover:scale-105"
                            @click="setOpenDialog(true, item)">
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>