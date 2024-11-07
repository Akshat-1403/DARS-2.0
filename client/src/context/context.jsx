import React, { useContext, useState } from "react";
const context = React.createContext();


export const ContextProvider = ({children})=>{
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [records, setRecords] = useState([]);
    const [role, setRole] = useState(AVAILABLE_ROLES.OTHER);
    
    const setRoleUsingIndex = (index) => {
        setRole(Object.values(AVAILABLE_ROLES)[index])
    }
    const getRecords = async ()=>{
        try{
            const res = await contract?.methods.getStudentRecords(account).call({from : account})
            setRecords(res);
          } catch(err) { 
            console.error(err)
          }
    }

    return (
        <context.Provider
            value={{
                web3, setWeb3, 
                account, setAccount,
                contract, setContract,
                role, setRole, setRoleUsingIndex, 
                records, setRecords, getRecords, 
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