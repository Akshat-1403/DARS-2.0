// import { useState } from "react"
// import { useAppContext } from "../../context/context";
// import { Loader } from "../../components";
// import { Link } from "react-router-dom";
import AddPersonDetails from "../../components";

export default function AddStudentPage() {
  const inputs = ["name"]
  return (
    <AddPersonDetails person="student" inputs={inputs} handleSubmit={()=>{}} />
  )
}