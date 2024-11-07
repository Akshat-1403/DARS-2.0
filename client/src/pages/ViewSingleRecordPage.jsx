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
            <h3>{record.title}</h3>
            <div>
                <h3>Student Details</h3>
                <div>
                    
                </div>
            </div>
            <div>
                <h3>Institute Details</h3>
                <div>
                    
                </div>
            </div>
        </div>
    )
}