import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        // cancellation tokens, is to cancel our
        // request and we'll do that if the component unmounts
        // cancel any pending request that is still out there if
        // the component unmounts
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });
                const userNames = response.data.map(user => user.username)
                console.log("Users response", response.data);
                isMounted && setUsers(userNames);
            } catch (e) {
                console.error("**Error in Users:", e);
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };

        getUsers();

        return () => {
            // clean up functions runs as the component unmounts
            isMounted = false;
            // abort/cancel any request that we have pending when the component unmounts
            controller.abort();
        };
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
            <br />
        </article>
    );
};

export default Users;
