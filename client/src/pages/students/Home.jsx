import { useEffect, useState } from "react";

import { ListComponent, LoadingWrapper } from "../../components";
import { useAppContext } from "../../context/context";

export default function Home() {
  const { account, contract } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([])

  useEffect(() => {
    console.log(account, loading)
    setLoading(true)
    try{
      (contract.methods.getStudentRecords(account).call({from : account}))
      .then((res) => {
        console.log(res)
        setRecords(res)
        setLoading(false)
      })
    }catch(err){
      console.error(err)
      setLoading(false)
    }
  }, [])
  
  return (
    <LoadingWrapper condition={loading}>
      <div className="w-full flex flex-col items-between gap-8">
        <h2 className="text-4xl font-bold">
          Your Recourds
        </h2>
        <div>
          <h3>Approved Records</h3>
          <hr />
          <ul className="py-4 flex flex-col gap-4">
            {
              records?.map((r, indx) =>
                r.isApproved ?
                  <ListComponent
                    title={r.title}
                    studentId={r.studentAddress}
                    instituteId={r.instituteAddress}
                    description={r.description}
                    docHash = {r.docHash}
                    key={indx}
                    to={`/records/${r.studentId}`}
                  />
                  :
                  null
              )
            }
          </ul>
        </div>
        <div>
          <h3>To be Approved</h3>
          <hr />
          <ul className="py-4 flex flex-col gap-4">
            {
              records?.map((r, indx) =>
                r.isApproved ? null :
                  <ListComponent
                    title={r.title}
                    studentId={r.studentAddress}
                    instituteId={r.instituteAddress}
                    description={r.description}
                    docHash = {r.docHash}
                    isApproved={false}
                    key={indx}
                    to={`/records/${r.studentId}`}
                  />
              )
            }
          </ul>
        </div>
      </div>
    </LoadingWrapper>
  );
}