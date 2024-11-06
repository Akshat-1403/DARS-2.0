import React, { useContext, useState } from "react";
const context = React.createContext();


export const ContextProvider = ({children})=>{
    const [web3, setWeb3] = useState({});
    const [account, setAccount] = useState({});
    const [contract, setContract] = useState({});

    return (
        <context.Provider
            value={{
                web3, setWeb3, 
                account, setAccount,
                contract, setContract
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(context)
}