import { useState } from "react"

export default function AddPersonDetails({ person, inputs, submitAction }) {
  const [formData, setFormData] = useState(()=>{
    const obj = {};
    inputs.forEach(input => obj[input] = "");
    return obj;
  });
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="w-full h-full px-4 sm:px-8 flex items-center justify-around">
        <form 
            className="w-full lg:w-auto border border-gray-600 rounded-3xl p-2 py-4 md:p-8 md:py-10 flex flex-col gap-4 md:gap-8" 
            onSubmit={submitAction}
        >
            
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-lg md:text-2xl ">Add a {person}</p>
            </div>

            {
                inputs.map(input => 
                    <div className="flex gap-8 justify-between lg:justify-start">
                        <label htmlFor="courseName" className="min-w-[9vw] text-md md:text-lg">
                            {person} {input}
                        </label>
                        <input 
                            className="w-[50vw] lg:w-auto text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
                            type="text" 
                            name={input}
                            value={formData[input]} 
                            onChange={handleChange} 
                        />
                    </div>
                )
            }
            <button 
                type="submit" 
                disabled={loading}
                className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
                style={{opacity:(loading?0.5:1)}}
            >   
            {
                loading?
                <Loader loading={loading} size="1rem" color={"white"} />:
                "Add+"
            }
            </button>
        </form>
        
        <img src="/enter-grade.svg" alt="Enter Grade" className="w-[30vw] hidden lg:block"/>
    </div>
  )
}