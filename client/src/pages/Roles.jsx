import { Link, useActionData } from "react-router-dom";
import { useAppContext } from "../context/context";

export default function SelectRoles() {
  const {role, setRoleUsingIndex} = useAppContext();
  const roles = [
    {
        title: "Student",
        img: "/student.svg",
        to: "/student",
        action: ()=>setRoleUsingIndex(0)
    },
    {
        title: "Institute",
        img: "institute.svg",
        to: "/upload-record",
        action: ()=>setRoleUsingIndex(1)
    },
    {
        title: "Verifier",
        img: "/others.svg",
        to: "/view-record",
        action: ()=>setRoleUsingIndex(2),
    },
  ]

  return (
    <div className="w-full flex justify-between gap-8">
      {
        roles.map((r) => 
          <Link 
            key={r.title} 
            className="p-6 border border-black rounded flex flex-col items-center justify-between gap-8 hover:scale-[1.02]"
            onClick={r.action}
            to={r.to || ""}
          >
            <img src={r.img} alt={r.title} className="w-64"/>
            <h3>{r.title}</h3>
          </Link>
        )
      }
    </div>
  );
}