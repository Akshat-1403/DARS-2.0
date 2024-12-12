import React, { useContext, useEffect, useState } from "react";
import getWeb3 from "../utils/getWeb3";
import EducationContract from "../contracts/EducationContract.json";
import toast from "react-hot-toast";
const context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [records, setRecords] = useState([]);
  const [role, setRole] = useState(AVAILABLE_ROLES.OTHER);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const setRoleUsingIndex = (index) => {
    setRole(Object.values(AVAILABLE_ROLES)[index]);
  };

  const getRecords = async () => {
    try {
      const res = await contract?.methods
        .getStudentRecords(account)
        .call({ from: account });
      setRecords(res);
    } catch (err) {
      toast.error("Cannot get Records", { duration: 3000 });
      console.error(err);
    }
  };

  const initWeb3 = async () => {
    if (web3 && account && contract) return;
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EducationContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EducationContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      setWeb3(web3);
      setAccount(accounts[0]);
      setContract(instance);
    } catch (error) {
      toast.error(`Failed to load wallet`);
      console.error(error);
    }
  };
  const logout = () => {
    setRole(AVAILABLE_ROLES.OTHER);
    setWeb3(null);
    setAccount(null);
    setContract(null);
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    if (!account) {
      toast.success("Please Login!", { duration: 3000 });
    }
  }, []);

  return (
    <context.Provider
      value={{
        web3,
        setWeb3,
        initWeb3,
        logout,
        account,
        setAccount,
        contract,
        setContract,
        role,
        setRole,
        setRoleUsingIndex,
        records,
        setRecords,
        getRecords,
        AVAILABLE_ROLES,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(context);
};

export const AVAILABLE_ROLES = {
  STUDENT: "STUDENT",
  INSTITUTE: "INSTITUTE",
  OTHER: "OTHER",
};
