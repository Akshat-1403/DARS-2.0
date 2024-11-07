import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListComponent(resource) {
  const [expand, setExpand] = useState(false);
  // description
  const truncatedDescription =
    resource.description.length > 200 && !expand
      ? `${resource.description.substr(0, 200)}...`
      : resource.description;

  const handleApprove = async (e) => {
    // do something
  }
    
  return (
    <li className="w-full min-w-fit rounded-2xl overflow-hidden border border-blue-500">
      <Link 
      className="p-4 w-full flex flex-col justify-between gap-4"
        to={resource.url || ""}
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
          <p>
            doc Hash: {resource.docHash}
          </p>
          {
            resource.isApproved===false && 
            <button onClick={handleApprove} className="h-fit px-3 py-1.5 bg-blue-500 text-white rounded">
              Approve
            </button>
          }
        </div>
      </Link>
    </li>
  );
}