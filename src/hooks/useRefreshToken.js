import React from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            // settings that aalows us to send cookies
            // with our request, and this request is going
            // to send along our cookie that has the reponse token
            withCredentials: true,
        });
        setAuth((prev) => {
            console.log('prev', JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
            };
        });
        return response.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
