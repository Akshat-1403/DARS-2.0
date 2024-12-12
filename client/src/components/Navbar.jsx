import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import { ConnectBtn, SelectRoleBtn } from "./";

export default function Navbar() {
  const [toggleValue, setToggle] = useState(false);
  const { account, role, AVAILABLE_ROLES } = useAppContext();

  const leftNav = {
    [AVAILABLE_ROLES.STUDENT]: [
      { title: "Your Records", to: "student" },
      { title: "Search Record", to: "view-record" },
    ],
    [AVAILABLE_ROLES.INSTITUTE]: [
      { title: "Add Records", to: "add-record" },
      { title: "Search Record", to: "view-record" },
    ],
    [AVAILABLE_ROLES.OTHER]: [{ title: "Search Record", to: "view-record" }],
  };

  const navRef = useRef(null);

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
        <div
          className="navbar__logo leading-[1em] flex gap-4 items-center"
          href="/"
        >
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
          (toggleValue && "nav__links nav__links--expanded !text-sm") ||
          "nav__links !text-sm"
        }
      >
        {leftNav[role].map((data) => (
          <Link
            className="text-center"
            onClick={() => setToggle(false)}
            to={data.to}
            key={data.title}
          >
            {data.title}
          </Link>
        ))}

        <ConnectBtn className="ml-4" />

        {account && <SelectRoleBtn />}
      </ul>
    </nav>
  );
}
