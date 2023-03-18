import { defineStore } from "pinia";
import { deleteCookie, getCookie, setCookie } from "./Cookie";
import { IUser } from "../contracts/IUser"

interface State {
    phpsession: string
}

export const UserStore = defineStore("user", {
    state: () : IUser => ({
        phpsession: getCookie("s") ?? "",
        username: getCookie("n") ?? ""
    }),
    getters: {
        user : (state) : IUser => ({
            phpsession: state.phpsession,
            username: state.username
        })
    },
    actions: {

        setSession (session: string) {
            setCookie("s", session, 365)
            this.phpsession = session
        },

        deleteSession() {
            deleteCookie("s");
            this.phpsession = ""
            this.setName("")
        },

        setName(username: string) {
            setCookie("n", username, 365)
            this.username = username
        }
    }
})