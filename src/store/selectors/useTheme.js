import { selector } from "recoil";
import { themeState } from "../atoms/theme";

export const useTheme = selector({
    key : "useTheme",
    get : ({get}) =>{
        const state = get(themeState)
        return state
    }
})