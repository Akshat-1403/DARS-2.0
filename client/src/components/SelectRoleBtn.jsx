import { AVAILABLE_ROLES, useAppContext } from "../context/context";

export default function SelectRoleBtn() {
  const { role, setShowLoginModal } = useAppContext();
  return (
    <button
      className="text-white px-3 py-2 relative bg-blue-500 rounded hover:bg-blue-800"
      onClick={() => setShowLoginModal((v) => !v)}
      disabled={role !== AVAILABLE_ROLES.OTHER}
    >
      {role === AVAILABLE_ROLES.OTHER ? "Select Role" : `You: ${role}`}
    </button>
  );
}
