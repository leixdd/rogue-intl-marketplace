import { IUser, IUserLoginCredentials } from "../contracts/IUser"
import { UserStore } from "../store/User"
import Swal from "sweetalert2"

const API_URL = import.meta.env.VITE_API_URL

export const getCurrentUser =  (userFromState: IUser) : Promise<IUser | null> => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/api/v1/rint/activity`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sx: userFromState.phpsession
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.data.includes("need login")) {
                resolve(null);
            }
            else {
                resolve(userFromState)
            }
        })
        .catch(err => {
            resolve(null)
        })
    })
}

export const login = (credentials: IUserLoginCredentials) : Promise<boolean> => {
    const userStore = UserStore();
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/api/v1/rint/activity/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sx: userStore.user.phpsession,
                account: credentials.account,
                password: credentials.password,
                vcode: credentials.securitycode
            })
        })
        .then((response) => response.json())
        .then(data => {
            resolve(Boolean(data.success))
        })
        .catch(err => {
            Swal.fire("Error", "Something went wrong", "error");
            resolve(false)
        })
    })
}
