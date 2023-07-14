import { useContext } from "react"
import { userContext } from "../context/UserProvider"

export const useAuth = () => {
    const auth = useContext(userContext);
    return auth
}