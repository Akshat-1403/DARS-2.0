import React, { useState, useEffect, useRef } from "react";
import { truncateStr } from "../utils/truncateStr";
import { Link } from "react-router-dom";

import getWeb3 from '../utils/getWeb3'
import EducationContract from '../contracts/EducationContract.json'
import { useAppContext } from '../context/context.jsx'

const Navbar = ({ showConnectModal }) => {
  
  const [toggleValue, setToggle] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const {web3, account, contract, setWeb3, setAccount, setContract} = useAppContext();

  const navRef = useRef(null);

  const initWeb3 = async () => {
    if(web3 && account && contract) return;
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EducationContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EducationContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccount(accounts[0]);
      setContract(instance);
    } catch (error) {
      alert(`Failed to load wallet`);
      console.error(error);
    }
  };

  useEffect(()=>{
    initWeb3();
  }, [])


  const handleToggle = () => {
    setToggle(!toggleValue);
  };

  const closeNavOnScroll = () => {
    if (toggleValue) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", closeNavOnScroll);
    return () => {
      window.removeEventListener("scroll", closeNavOnScroll);
    };
    // eslint-disable-next-line
  }, [toggleValue]);

  return (
    <nav className="navbar">
      <div className="nav__header">
        <div
          onClick={handleToggle}
          className={
            (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
          }
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar__logo leading-[1em] flex gap-4 items-center" href="/">
          <Link to="/">
            <img src="/logo.svg" alt="logo" className="w-12 h-12" />
          </Link>
          <div className="flex flex-col text-2xl gap-[-10px]">
            <div>Decentralized Academic </div>
            <div>Record System</div>
          </div>
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded !text-sm") || "nav__links !text-sm"
        }
      >
        <Link className="text-center" onClick={() => setToggle(false)} to="/view-record">
          View Record
        </Link>
        <a
          href="https://ethereum.org/en/developers/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center"
        >
          Built on Ethereum
        </a>
        <button
          className="px-3 py-2 relative hover:cursor-pointer bg-blue-500 rounded"
          onClick={() => {
            initWeb3();
            setShowOption(!showOption)
          }}
        >
          {
            account? truncateStr(account,12) : "Connect"
          }
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;