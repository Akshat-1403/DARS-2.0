import { Input, Select, Option } from "@material-tailwind/react";
import { AVAILABLE_ROLES, useAppContext } from "../context/context";
import SignupLoginBtns from "./SingupLoginBtns";
import { useState } from "react";

export default function LoginModal() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { showLoginModal, setShowLoginModal } = useAppContext();

  if (!showLoginModal) {
    return null;
  }

  return (
    <div className="h-screen w-screen absolute bg-black/50 z-10 grid place-items-center">
      <div className="p-4 relative border-2 border-gray-500 rounded-lg bg-white">
        <button
          className="absolute top-4 right-4 rounded-full bg-blue-500 p-1"
          onClick={() => setShowLoginModal(false)}
        >
          <img src="./close.svg" alt="selected" className="w-4 h-4" />
        </button>

        <h3 className="text-blue-500 text-2xl mb-2 font-bold">CONNECT</h3>

        <p className="text-gray-500 text-xs mb-6">
          You don't need to login to see records. Just click on "Search Record"
          in navbar to see a record.
        </p>

        <form className="flex flex-col gap-3 mb-4">
          <Select
            variant="standard"
            label="Select Role"
            color="blue"
            onChange={(value) => setRole(value)}
          >
            <Option value={AVAILABLE_ROLES.INSTITUTE}>
              {AVAILABLE_ROLES.INSTITUTE}
            </Option>
            ;
            <Option value={AVAILABLE_ROLES.STUDENT}>
              {AVAILABLE_ROLES.STUDENT}
            </Option>
            ;
          </Select>

          {role !== AVAILABLE_ROLES.OTHER && (
            <Input
              variant="standard"
              label="Name"
              placeholder="Name"
              color="blue"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
            />
          )}
          {role === AVAILABLE_ROLES.INSTITUTE && (
            <Input
              variant="standard"
              label="Location"
              placeholder="Location"
              color="blue"
              value={location}
              onChange={(e) => setLocation(e?.target?.value)}
            />
          )}
        </form>

        <SignupLoginBtns role={role} name={name} location={location} />
      </div>
    </div>
  );
}
