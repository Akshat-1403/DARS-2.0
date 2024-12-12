import { useEffect, useLayoutEffect, useState } from "react";

import { ListComponent, LoadingWrapper } from "../../components";
import { useAppContext } from "../../context/context";

export default function Home() {
  const { records, getRecords, account, contract } = useAppContext();
  const [loading, setLoading] = useState(false);
  // useLayoutEffect(()=>{
  //   const getRole = async ()=>{
  //     await contract
  //   }
  // }, [])
  useEffect(() => {
    if(records && records.length > 0) return;
    setLoading(true)
    getRecords()
      .finally(setLoading(false));
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
                    docHash={r.docHash}
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
                    docHash={r.docHash}
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