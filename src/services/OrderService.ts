import Swal from "sweetalert2"
import { IOrder } from "../contracts/IOrder"
import { UserStore } from "../store/User"


const API_URL = import.meta.env.VITE_API_URL

export const ORDER_STATUS = ["Pending", "Approved", "Denied"]

export const getOrders = () : Promise<IOrder[] | null> => {
    const userStore = UserStore()
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/api/v1/rint/orders`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sx: userStore.phpsession,
                n: userStore.username
            })
        })
        .then(response => response.json())
        .then(data => {
            if(!data.success) {
                Swal.fire("Error", data.data, "error")
                resolve(null)
            }

            resolve(data.data)
        })
    })
}