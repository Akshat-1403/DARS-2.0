import { useState } from "react";
import { AVAILABLE_ROLES, useAppContext } from "../context/context";
import toast from "react-hot-toast";
import Loader from "./Loader";

export default function SignupLoginBtns({ role, name, location }) {
  const { setRole, account, contract, setShowLoginModal } = useAppContext();
  const [localLoading, setLocalLoading] = useState(false);

  const handleSingup = async () => {
    if (!account || !contract) {
      toast.error("Connect the metamask before login/signup.");
      return;
    }
    if (Object.values(AVAILABLE_ROLES).indexOf(role) === -1 || !name) {
      toast.error(!name ? "Please provide name." : "Please select the role.");
      return;
    }
    if (role === AVAILABLE_ROLES.INSTITUTE && !location) {
      toast.error("Please provide institute's location.");
      return;
    }

    setLocalLoading(true);
    try {
      const res = await contract?.methods.getRole().call({ from: account });
      if (res === "0") {
        toast.error("You are already a student.");
        return;
      } else if (res === "1") {
        toast.error("You are already a institute.");
        return;
      }

      if (role === AVAILABLE_ROLES.INSTITUTE) {
        await contract.methods
          .addInstitute(name, location)
          .send({ from: account });
      } else if (role === AVAILABLE_ROLES.STUDENT) {
        await contract.methods.addStudent(name).send({ from: account });
      }

      setRole(role);
    } catch (err) {
      console.log(err);
      toast.error(
        err.message?.message || err.message || "Something went wrong!"
      );
    } finally {
      setLocalLoading(false);
      setShowLoginModal(false);
    }
  };
  const handleStudent = async () => {
    setLocalLoading(true);
    try {
      const res = await contract?.methods.getRole().call({ from: account });
      if (res === "2") {
        toast.error("You have never created account before.");
        return;
      } else if (res === "1") {
        toast.error("You are already a institute.");
        return;
      }
      setRole(AVAILABLE_ROLES.STUDENT);
    } catch (err) {
      toast.error(
        err.message?.message || err.message || "Something went wrong!"
      );
    } finally {
      setLocalLoading(false);
      setShowLoginModal(false);
    }
  };
  const handleInstitute = async () => {
    setLocalLoading(true);
    try {
      const res = await contract?.methods.getRole().call({ from: account });
      if (res === "2") {
        toast.error("You have never created account before.");
        return;
      } else if (res === "0") {
        toast.error("You are already a Student.");
        return;
      }

      setRole(AVAILABLE_ROLES.INSTITUTE);
    } catch (err) {
      toast.error(
        err.message?.message || err.message || "Something went wrong!"
      );
    } finally {
      setLocalLoading(false);
      setShowLoginModal(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <button
        className="p-2 rounded w-full border-2 border-blue-500 text-center text-blue-500 hover:text-white hover:bg-blue-800"
        onClick={handleSingup}
      >
        {localLoading ? <Loader loading={true} color={"white"} /> : "Sign-Up"}
      </button>

      <button
        className="px-3 py-2 rounded w-full bg-blue-500 text-center text-white hover:bg-blue-800"
        onClick={handleStudent}
      >
        Already a Student
      </button>

      <button
        className="px-3 py-2 rounded w-full bg-blue-500 text-center text-white hover:bg-blue-800"
        onClick={handleInstitute}
      >
        Already a Institute
      </button>
    </div>
  );
}
