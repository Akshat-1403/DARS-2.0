import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/context";

export default function ViewSingleRecordPage() {
    const { recordId } = useParams();
    const [localLoading, setLocalLoading] = useState(true);
    const [record, setRecord] = useState({});
    const { account, contract } = useAppContext();

    useEffect(()=> {
        setLocalLoading(true);
        const getRecord = async ()=>{
            try {
                let res = await contract.methods.getSingleRecord(recordId).call({ from: account });
        
                console.log(res);
                return res;
              } catch (error) {
                console.error("Error fetching record details:", error);
              }
        }

        getRecord()
            .then(res => {
                console.log(res)
                setRecord(res)
            })
            .finally(()=> setLocalLoading(false));
    }, []);
    
    const handleDownload = async (e) => {
        e.preventDefault();
        try{
            const url = 'http://localhost:3000/download/' + recordId
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                }
            });
    
            if (!response.ok) {
                throw new Error(`Failed to download PDF: ${response.statusText}`);
            }
    
            // Convert the response to a Blob (binary large object)
            const blob = await response.blob();
            const urlObject = URL.createObjectURL(blob);
    
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = urlObject;
            link.download = `document_${recordId}.pdf`;  // Set the file name
            document.body.appendChild(link);
            link.click();
    
            // Clean up the temporary link and revoke the Blob URL
            document.body.removeChild(link);
            URL.revokeObjectURL(urlObject);
        } catch(err){
            alert(err.message())
        }
    }

    if(localLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full h-full flex flex-col items-start gap-4">
            <div>
                <h3 className="text-3xl font-bold">{record?.title}</h3>
                <p className="text-gray-500 text-sm">{recordId}</p>
            </div>
            <div>
                <h3 className="text-lg font-medium">Student Details</h3>
                <hr />
                <div className="flex justify-between items-center gap-8">
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Student Name:</p>
                        <p>{record?.studentName}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Student Address:</p>
                        <p>{record?.studentAddress}</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Institute Details</h3>
                <hr />
                <div className="flex flex-col gap-2 items-start">
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Institute Name:</p>
                        <p>{record?.instituteName}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Institute Address:</p>
                        <p>{record?.instituteAddress}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Institute Location:</p>
                        <p>{record?.instituteLocation}</p>
                    </div>
                </div>
            </div>
            <button className="px-3 py-1.5 bg-blue-500 text-white rounded" onClick={handleDownload}>
                Download Document
            </button>
        </div>
    )
}