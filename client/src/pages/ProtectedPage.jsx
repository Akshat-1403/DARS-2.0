import { useAppContext } from "../context/context";
import { ReactTyped } from "react-typed";

export default function ProtectedPage({ children, requiredRole }) {
  const { account, contract, role } = useAppContext();

  if (account && contract && requiredRole === role) {
    return children;
  }

  return (
    <section className="w-full h-full flex flex-col gap-12 justify-around items-center">
      <div className="w-fit min-w-[30vw]">
        <ReactTyped
          className="pl-8 text-4xl font-bold text-center w-full flex items-end"
          strings={[
            `Please <span style='color:  #2563eb;'>Login</span> as ${requiredRole.toLowerCase()} to Proceed.`,
          ]}
          typeSpeed={35}
          showCursor={false}
        />
      </div>
      <img
        src="/please-login.svg"
        alt="Please Login"
        className="w-[75vw] sm:w-[45vw] md:w-[35vw]"
      />
    </section>
  );
}
