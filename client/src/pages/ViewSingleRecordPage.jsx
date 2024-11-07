import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewSingleRecordPage() {
    const { recordId } = useParams();
    const [localLoading, setLocalLoading] = useState(false);
    const [record, setRecord] = useState({});

    useEffect(()=> {
        const getRecord = async ()=>{
            return     {
                title: "Hello World",
                studentId: "St&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
                instituteId: "Rw&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
                description: "lorem ipsum fealwcv iof ejwafic voierwaho lf eaw feaf w&^EOWFIUEW324EF$#^KFH@WeaFWcwC &^EOWFIUEW324EF$#^KFH@WeaFWcwC fjea oeaivw ovbiawqi fioewahv", 
                isApproved: true, 
            }
        }

        getRecord()
            .then(res => setRecord(res))
            .finally(()=> setLocalLoading(false));
    });
    
    return (
        <div>
            <h3 className="text-3xl font-bold">{record.title}</h3>
            <div>
                <h3 className="text-lg font-medium">Student Details</h3>
                <div className="flex justify-between items-center gap-8">
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Student Name:</p>
                        <p>{}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Student Address:</p>
                        <p>{record.studentId}</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Institute Details</h3>
                <div className="flex flex-col gap-8">
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Institute Name:</p>
                        <p>{}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Institute Address:</p>
                        <p>{record.studentId}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <p className="text-gray-500">Institute Location:</p>
                        <p>{}</p>
                    </div>
                </div>
            </div>
            <button className="px-3 py-1.5 bg-blue-500 text-white">
                Download Document
            </button>
        </div>
    )
}