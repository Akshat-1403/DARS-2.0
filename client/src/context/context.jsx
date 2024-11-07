import React, { useContext, useState } from "react";
const context = React.createContext();


export const ContextProvider = ({children})=>{
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [role, setRole] = useState(AVAILABLE_ROLES.OTHER);
    const setRoleUsingIndex = (index) => {
        setRole(Object.values(AVAILABLE_ROLES)[index])
    }

    return (
        <context.Provider
            value={{
                web3, setWeb3, 
                account, setAccount,
                contract, setContract,
                role, setRole, setRoleUsingIndex, 
                AVAILABLE_ROLES,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(context)
}


const AVAILABLE_ROLES = {
    STUDENT: "STUDENT",
    INSTITUTE: "INSTITUTE",
    OTHER: "OTHER",
}