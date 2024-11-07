import { useState } from "react";
import { AddPersonDetails } from "../../components";
import { useAppContext } from "../../context/context";

export default function AddStudentPage() {
  const inputs = ["name"]
  const [localLoading, setLocalLoading] = useState(false);
  const { account, contract } = useAppContext();

  const handleSubmit = async (formData) => {
    setLocalLoading(true);
    const addStudent = async ()=>{
      try {
          const res = await (contract.methods
            .addStudent(formData[inputs[0]])
            .send({ from: account }));
    
          console.log(res);
        } catch (error) {
          console.error("Error adding student details:", error);
        }
    }

    addStudent()
        .finally(()=> setLocalLoading(false));
  }

  if(localLoading) {
    return <div>Loading...</div>
  }

  return (
    <AddPersonDetails person="student" inputs={inputs} submitAction={handleSubmit} />
  )
}