import toast, { Toaster } from "react-hot-toast";
// import ConnectModal from "../components/ConnectModal";
import Navbar from "../components/Navbar.jsx";
// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { useAppContext } from "../context/Context";

export default function SharedLayout() {
//   const { wallet, setWallet, error, errorMessage} = useAppContext();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showConnectModal = (value) => {
    // setIsModalOpen(value);
//   };

//   useEffect(()=>{
//     if(error) {
//       toast.error(errorMessage, {
//         duration: 3000,
//       });
//     }
//     // eslint-disable-next-line
//   }, [error])

  return (
    <div className="app min-h-[100vh]">
      <Navbar 
        // setWallet={setWallet} wallet={wallet} 
        // showConnectModal={showConnectModal} 
        showConnectModal={true} 
      />
      
      <Toaster position="top-center"/>
      
      {/* <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        setWallet={setWallet}
      /> */}
      <main className="min-h-[84vh] px-[6vw] flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}