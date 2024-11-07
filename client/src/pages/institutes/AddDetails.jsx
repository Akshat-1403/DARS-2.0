// import { useState } from "react"
// import { useAppContext } from "../../context/context";

import { AddPersonDetails } from "../../components";

export default function AddInstitutePage() {
  const inputs = ["name", "location"]
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
  }
  return (
    <AddPersonDetails person="institute" inputs={inputs} handleSubmit={handleSubmit} />
  )
}