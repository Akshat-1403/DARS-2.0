import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import toast from "react-hot-toast";

export default function ListComponent(resource) {
  const [expand, setExpand] = useState(false);
  const { account, contract, getRecords } = useAppContext();

  const truncatedDescription =
    resource.description.length > 200 && !expand
      ? `${resource.description.substr(0, 200)}...`
      : resource.description;

  const handleApprove = async (e) => {
    try {
      const res = await (contract.methods
        .approveRecord(resource.docHash)
        .send({ from: account }));
      console.log("Approved");
      getRecords();
    } catch(err) {
      toast.error("ERROR WHILE APPROVING RECORD" + err.message, {duration: 3000});
      console.log("ERROR WHILE APPROVING RECORD" + err)
    }
  }
    
  return (
    <li className="w-full min-w-fit rounded-2xl overflow-hidden border border-blue-500">
      <Link 
        className="p-4 w-full flex flex-col justify-between gap-4"
        to={"/view-record/" + resource.docHash}
      >
        <div className="w-full flex justify-between">
          <h3 className="text-xl font-medium">{resource.title}</h3>
          <p>
            <span className="text-gray-600">Institute ID:</span>
            {" " + resource.instituteId}
          </p>
          <p>
            <span className="text-gray-600">Student ID:</span>
            {" " + resource.studentId}
          </p>
        </div>
        <div className="flex justify-between items-center gap-8">
          <p>
            {truncatedDescription}
            {
              truncatedDescription.length === 203 ?
              <button onClick={()=>setExpand(true)}>more</button>
              : null
            }
          </p>
          {
            resource.isApproved===false && 
            <button onClick={handleApprove} className="h-fit px-3 py-1.5 bg-blue-500 text-white rounded">
              Approve
            </button>
          }
        </div>
        <p className="text-gray-500 text-sm">
          {resource.docHash}
        </p>
      </Link>
    </li>
  );
}