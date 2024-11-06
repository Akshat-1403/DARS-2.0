import { Link } from "react-router-dom";

export default function SelectRoles() {
  return (
    <div className="w-full flex justify-between gap-8">
      {
        roles.map((r) => 
          <Link 
            key={r.title} 
            className="p-6 border border-black rounded flex flex-col items-center justify-between gap-8 hover:scale-[1.02]"
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

const roles = [
    {
        title: "Student",
        img: "/student.svg",
    },
    {
        title: "Institute",
        img: "institute.svg",
    },
    {
        title: "Other",
        img: "/others.svg",
    },
]