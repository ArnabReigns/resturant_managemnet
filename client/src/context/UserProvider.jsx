import React, { createContext, useEffect, useState } from "react";

const userContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        var getUser = localStorage.getItem("user");
        if (getUser != null) setuser(JSON.parse(getUser));
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const value = {
        user,
        setuser,
        loading,
        setloading,
    };

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
};

export { userContext };
export default UserProvider;
