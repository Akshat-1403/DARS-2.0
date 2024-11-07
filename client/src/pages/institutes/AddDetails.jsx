import { useState } from "react";
import { AddPersonDetails } from "../../components";
import { useAppContext } from "../../context/context";

export default function AddInstitutePage() {
  const inputs = ["name", "location"]
  const [localLoading, setLocalLoading] = useState(false);
  const { contract } = useAppContext();

  const handleSubmit = async (formData)=>{
    setLocalLoading(true);
    const addInstitute = async ()=>{
      try {
          const res = await (contract.methods
            .addInstitute(formData[inputs[0]], formData[inputs[0]])
            .send({ from: account }));
    
          console.log(res);
        } catch (error) {
          console.error("Error adding Institute details:", error);
        }
    }

    addInstitute()
        .finally(()=> setLocalLoading(false));
  }

  if(localLoading) {
    return <div>Loading...</div>
  }

  return (
    <AddPersonDetails person="institute" inputs={inputs} submitAction={handleSubmit} />
  )
}