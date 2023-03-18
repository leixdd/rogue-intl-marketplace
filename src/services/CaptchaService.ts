import { ICaptcha, ICaptchaRequest } from "../contracts/ICaptcha";
import { UserStore } from "../store/User";
import { IUser } from "../contracts/IUser";

const API_URL = import.meta.env.VITE_API_URL

export const fetchCaptcha = (captchaRequest: ICaptchaRequest) : Promise<ICaptcha | null>  => {

    const userStore = UserStore()
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/api/v1/rint/captcha?server=${captchaRequest.server}&sx=${captchaRequest.sx}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (userStore.user.phpsession === "") {
                    userStore.setSession(data.phpsession)
                }

                resolve({
                    image: `data:image/png;base64,${data.image}`,
                    phpsession: data.phpsession 
                } as ICaptcha)
            })
            .catch(err => resolve(null))
    })
}
