import { selector } from "recoil";
import { userState } from "../atoms/user";


export const useUser = selector({
    key : "useUser",
    get : ({get}) =>{
        const state = get(userState)
        return state
    }
})