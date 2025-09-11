import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({name: "JOHN"});

    const updateUserName = (name) => {
        setUser({name: name});
    }

    return (
        <UserContext.Provider value = {{user, updateUserName}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};