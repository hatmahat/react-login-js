import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axios("/logout", {
                withCredentials: true,
            });
        } catch (e) {
            console.error("**Error in logout:", e);
        }
    };

    return logout;
};

export default useLogout;