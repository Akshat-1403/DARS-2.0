// import { useState } from "react"
// import { useAppContext } from "../../context/context";
import { AddPersonDetails } from "../../components";

export default function AddStudentPage() {
  const inputs = ["name"]
  const handleSubmit = async (e)=>{
    e.preventDefault();
  }

  return (
    <AddPersonDetails person="student" inputs={inputs} handleSubmit={handleSubmit} />
  )
}