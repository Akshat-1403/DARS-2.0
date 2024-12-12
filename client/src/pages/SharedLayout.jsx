import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div className="app min-h-[100vh]">
      <Navbar showConnectModal={true} />

      <Toaster position="top-center" />
      <main className="min-h-[84vh] px-[6vw] flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
