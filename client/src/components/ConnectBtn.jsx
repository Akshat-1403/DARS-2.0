import { useAppContext } from "../context/context";
import { truncateStr } from "../utils/truncateStr";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export default function ConnectBtn({ className }) {
  const { account, initWeb3, logout } = useAppContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleChange = () => setShowLogoutModal((v) => !v);
  const handleLogout = () => {
    logout();
    handleChange();
  };

  return (
    <>
      <button
        className={
          "text-white px-3 py-2 relative hover:cursor-pointer hover:bg-blue-800 bg-blue-500 rounded" +
          " " +
          className
        }
        onClick={account ? handleChange : initWeb3}
      >
        {account ? truncateStr(account, 12) : "Connect"}
      </button>
      /*{" "}
      <Dialog open={showLogoutModal} handler={handleChange}>
        <DialogHeader>Do you want to logout?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleChange}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        </DialogFooter>
      </Dialog>{" "}
      */
    </>
  );
}
