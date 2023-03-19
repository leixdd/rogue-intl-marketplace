<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import HeaderComponent from './HeaderComponent.vue';
import { UserStore } from '../store/User';
import { getCurrentUser } from '../services/UserService';

const API_SERVER = ref(import.meta.env.VITE_API_URL);


const router = useRouter();
const route = useRoute();
const userStore = UserStore();

const server = ref("SEA");
const contactServer = ref("Discord");
const contactservertext = ref("DiscordID");
const paymentMethod = ref(0);
const telegram = ref("");
const account = ref(userStore.user.username);
const email = ref("");
const discord = ref("");
const UID = ref("");
const Amount = ref("");
const isTermsAccepted = ref(false);
const notes = ref("");




const submitOrder = () => {
   
    if(contactServer.value === "Discord") {
        discord.value = contactservertext.value;
    }
    else {
        telegram.value = contactservertext.value;
    }

    if(account.value == "") {
        Swal.fire("Please enter your account", "", "error");
        return;
    }

    if(UID.value == "") {
        Swal.fire("Please enter your UID", "", "error");
        return;
    }

    if(Amount.value == "") {
        Swal.fire("Please enter your Amount", "", "error");
        return;
    }

    if(!isTermsAccepted.value) {
        Swal.fire("Please accept our terms and conditions", "", "error");
        return;
    }

    //send to /api/v1/rint/order using multipart/formdata
    const formData = new FormData();
    formData.append("server", server.value);
    formData.append("payment_method", paymentMethods[paymentMethod.value].method);
    formData.append("telegram", telegram.value);
    formData.append("account", account.value);
    formData.append("email", email.value);
    formData.append("discord", discord.value);
    formData.append("uid", UID.value);
    formData.append("amount", Amount.value);
    formData.append("notes", notes.value);


    //formdata of multiple base64 files
    multipleFileUploads.value.forEach((file, index) => {
        formData.append(`file_${index}`, file.base64);
        formData.append(`filename_${index}`, file.name);
    })

    
    fetch(`${API_SERVER.value}/api/v1/rint/order`, {
        method: "POST",
        mode: "cors",
        body: formData,
    }).then((res) => res.json()).then((res) => {
        if(res.success) {
            Swal.fire("Order submitted", "", "success");
            router.push("/")
        } else {
            Swal.fire("Something went wrong", "", "error");
        }
    }).catch((err) => {
        Swal.fire("Something went wrong", "", "error");
    })





    
}

const priceList = reactive([
    {
        points: 550,
        usd_price: "Not Available",
        php_price: "Not Available"
    },
    {
        points: 1100,
        usd_price: 20,
        php_price: 1100
    },
    {
        points: 2200,
        usd_price: 40,
        php_price: 2200
    },
    {
        points: 5500,
        usd_price: 100,
        php_price: 5500
    },
    {
        points: 11000,
        usd_price: 200,
        php_price: 11000
    },
    {
        points: 22000,
        usd_price: 400,
        php_price: 22000
    }
])

interface IGS {
    [key: string]: string
}

interface IFileUpload {
    name: string;
    base64: string;
    type: string
}

const multipleFileUploads = ref<IFileUpload[]>([]);

const paymentMethods = reactive([
    {
        method: "GCash",
        instruction: "Account number: 09662642772 <br/>Name: Harrijans B."
    },
    {
        method: "Paymaya",
        instruction: "Account number: 09662642772 <br />Name: Harrijans B."
    },
    {
        method: "UnionBank",
        instruction: "Account number: 1094 8556 8121 <br />Name: Harrijans B."
    },
    {
        method: "Paypal",
        instruction: "Account name: Harrijans@gmail.com"
    },
    {
        method: "Binance",
        instruction: "Binance ID: 22767896 <br/>Name: CryptoosZ<br/><br/>USDT<br/>Address: TCNPdCpJw9rCyMSfEWan3kbBp5U9ix259F<br/>Network: TRON (TRC20)"
    }
])

//convert file to base64
const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const multipleOnChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            getBase64(file).then((data: any) => {
                multipleFileUploads.value.push({
                    name: file.name,
                    base64: data,
                    type: file.type
                })
            })
        }
    }
}

const clearUpload = () => {
    multipleFileUploads.value = [];
}




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

    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 text-white">
        <form @submit.prevent="submitOrder" class="mx-auto mt-4 mb-0 max-w-md space-y-4">
            <div>
                <label for="server" class="text-sm font-medium">Server</label>

                <div class="relative mt-1">

                    <select id="server" name="server" required v-model="server"
                        class="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm text-black">
                        <option value="SEA">SEA</option>
                        <option value="CN">CN</option>
                    </select>
                </div>
            </div>

            <div>
                <label for="server" class="text-sm font-medium">Select Telegram/Discord</label>

                <div class="relative mt-1">

                    <select id="server" name="server" required v-model="contactServer"
                        class="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm text-black">
                        <option value="Discord">Discord</option>
                        <option value="Telegram">Telegram</option>
                    </select>
                </div>
            </div>

            <div>
                <label for="discord" class="text-sm font-medium">Discord Name/Telegram Name</label>

                <div class="relative mt-1">
                    <input type="text" id="discord" name="discord" v-model="contactservertext"
                        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black" placeholder="Select Telegram/Discord for where the Promo Codes to be sent" />
                </div>
            </div>

            <div>
                <label for="email" class="text-sm font-medium">E-mail Address</label>

                <div class="relative mt-1">
                    <input type="email" id="email" name="email" required  v-model="email"
                        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
                        placeholder="Enter E-mail address" />
                    <span class="text-white">Please input a valid email. The donation code will be sent at your email.</span>
                </div>
            </div>

            <div>
                <label for="uid" class="text-sm font-medium">UID</label>

                <div class="relative mt-1">
                    <input type="text" id="" name="uid" required  v-model="UID"
                        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
                        placeholder="UID can be found on the system." />
                    <span class="text-white">Example: 63c28cc00971000fc00058d</span>
                </div>
            </div>

            <div class="my-5">
                <div class="bg-gray-900">
                    <h3 class="text-xl text-white p-2">Updated Price List</h3>
                    <table class="w-full text-left text-white border-collapse">
                        <thead>
                            <tr>
                                <th class="border border-slate-400">POINTS</th>
                                <th class="border border-slate-400">USD</th>
                                <th class="border border-slate-400">PHP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  class="border border-slate-400" v-for="p in priceList" :key="p.points">
                                <td class="border border-slate-400">{{ p.points }}</td>
                                <td class="border border-slate-400">{{ p.usd_price }}</td>
                                <td class="border border-slate-400">{{ p.php_price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <label for="amount" class="text-sm font-medium">Amount</label>

                <div class="relative mt-1">
                    <input type="number" id="amount" name="amount" required v-model="Amount"
                        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black" placeholder="Enter Amount" />
                    
                    <span class="text-white">Amount you want to Top up</span>
                </div>
            </div>

            <div>
                <label for="paymentMethod" class="text-sm font-medium">Payment Method</label>

                <div class="relative mt-1">

                    <select id="paymentMethod" name="paymentMethod" required v-model="paymentMethod"
                        class="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm text-black">
                        <option :value="i" v-for="(payment, i) in paymentMethods">{{ payment.method }}</option>
                    </select>
                </div>

                <div class="bg-gray-600 rounded mt-2">
                    <div class="p-5">
                        <strong class="text-white text-md" v-html="paymentMethods[paymentMethod].instruction"></strong>
                    </div>
                </div>
            </div>

            <div>
                <label for="paymentMethod" class="text-sm font-medium">Payment Proof (Screenshot of the transaction)</label>

                <div class="mt-1">
                    <div class="w-full items-center justify-center bg-grey-lighter">
                        <label
                            class="w-64 flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path
                                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-black leading-normal">Select a file</span>
                            <input type='file' class="hidden" multiple @change="multipleOnChange" accept=".png,.jpg,.jpeg"/>
                        </label>
                    </div>
                </div>

                <div class="bg-gray-900 rounded mt-3 text-white" v-if="multipleFileUploads && multipleFileUploads.length > 0">
                    <div class="p-5">
                        <h3>Uploaded Files</h3>
                        <button type="button" @click="clearUpload" class="btn-xs text-xs bg-rose-600 rounded p-1">CLICK HERE TO CLEAR ALL</button>
                        <div class="grid grid-cols-4 gap-3 mt-2">
                            <img v-for="file in multipleFileUploads" :src="file.base64" class="w-32 h-32"   />
                        </div>
                    </div>
                </div>
            </div>



            <div>
                <label for="comments" class="text-sm font-medium">Comments/Notes</label>

                <div class="relative mt-1">
                    <textarea type="text" id="amount" name="amount" v-model="notes"
                        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm h-32 text-black" placeholder="Type Here"></textarea>
                </div>
            </div>


            <div class="text-white p-3 mt-2">
                <ol style="list-style: disc;">
                    <li>If Gcash exceeds limit, you can use GCASH to PAYMAYA or GCASH to UNIONBANK</li>
                    <li>I accept USDT / BUSD on Binance ID payment</li>
                    <li>I only accept transactions as family or friends in paypal, 50$ minimum payment or else your funds
                        will be refunded back to you including tax</li>
                    <li>All donations are non refundable once sent</li>
                    <li>All donations are authorize by you before sending</li>
                </ol>
            </div>

            <div>
                <div class="grid grid-cols-12 mt-1">
                    <input type="checkbox" id="terms" name="terms" required v-model="isTermsAccepted"
                        class=" rounded-lg border-gray-200 p-4 text-sm shadow-sm" placeholder="Enter Amount" />
                    <label class="col-span-8 px-2"> I agree to Terms and Rules</label>
                </div>
            </div>



            <div class="flex items-center justify-between">
                <button type="submit"
                    class="w-full mt-2 inline-block rounded-lg bg-rose-500 px-5 py-5 text-sm font-medium text-white">
                    Submit
            </button>
        </div>
    </form>
</div></template>