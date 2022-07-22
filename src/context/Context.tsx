import { createContext } from "react";

const GlobalContext = createContext({
    isLoading: false,
    user: {}
})

export default GlobalContext