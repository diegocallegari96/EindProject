import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: {},
    setUser: () => {},
});

export function UseContextProvider({ children }) {
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const { user, setUser } = useContext(AuthContext);

    return { user, setUser };
}
