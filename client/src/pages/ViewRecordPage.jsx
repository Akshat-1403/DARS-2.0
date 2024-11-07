import { useState } from "react";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";

export default function ViewRecordPage() {
  const loading = false;
  const navigate = useNavigate();
  const [recordAddress, setRecordAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/view-record/" + recordAddress);
  }

  return (
    <div className="h-full w-full py-10 flex justify-between  items-center">
        <img src="/search-illustration.svg" alt="search" className="h-[65vh]"/>
        
        <form 
          className="w-full h-fit lg:w-auto border border-gray-600 rounded-3xl p-2 py-4 md:p-8 md:py-10 flex flex-col gap-4 md:gap-8" 
          onSubmit={handleSubmit}
        >
            
            <div className="flex flex-col md:flex-row justify-center font-bold">
                <h3 className="text-xl md:text-3xl ">Find Record</h3>
            </div>

            <input 
                className="!w-[32rem] lg:w-auto text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
                type="text" 
                name="recordAddress" 
                value={recordAddress} 
                placeholder="Enter record address"
                onChange={(e)=>setRecordAddress(e.target.value)} 
            />
            <button 
                type="submit" 
                disabled={loading}
                className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
                style={{opacity:(loading?0.5:1)}}
            >   
            {
                loading?
                <Loader loading={loading} size="1rem" color={"white"} />:
                "Find"
            }
            </button>
        </form>
    </div>
  );  
}