import { ListComponent } from "../../components";

export default function Home() {
    return (
        <div className="w-full flex flex-col items-between gap-8">
            <h2 className="text-4xl font-bold">
                Your Recourds
            </h2>
            <div>
                <h3>Approved Records</h3>
                <hr />
                <ul className="py-4 flex flex-col gap-4">
                    {
                      localRecords?.map((r, indx) =>
                        r.isApproved ? 
                        <ListComponent 
                          title={r.title}
                          studentId={r.studentId}
                          instituteId={r.instituteId}
                          description={r.description}
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
                      localRecords?.map((r, indx) =>
                        r.isApproved ? null :
                        <ListComponent 
                          title={r.title}
                          studentId={r.studentId}
                          instituteId={r.instituteId}
                          description={r.description}
                          isApproved={false}
                          key={indx} 
                          to={`/records/${r.studentId}`}
                        />
                      )
                    }
                </ul>
            </div>
        </div>
    );
}


const localRecords = [
    {
        title: "Hello World",
        studentId: "St&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
        instituteId: "Rw&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
        description: "lorem ipsum fealwcv iof ejwafic voierwaho lf eaw feaf w&^EOWFIUEW324EF$#^KFH@WeaFWcwC &^EOWFIUEW324EF$#^KFH@WeaFWcwC fjea oeaivw ovbiawqi fioewahv", 
        isApproved: true, 
    },
    {
      title: "Hello World 1.2",
      studentId: "St&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
      instituteId: "Rw&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
      description: "lorem ipsum fealwcv iof ejwafic voierwaho efae gfeaf eage wgewafe vfewa ewaef efawef efaw3e4g dshrrtd jnytrfj ftykliukogvum sef rnhtsre fevwa febret hterbdb fhkjuyjh lf eaw feaf w&^EOWFIUEW324EF$#^KFH@WeaFWcwC &^EOWFIUEW324EF$#^KFH@WeaFWcwC fjea oeaivw ovbiawqi fioewahv", 
      isApproved: true, 
  },
    {
        title: "Hello World 2",
        studentId: "Yr3&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
        instituteId: "Je&^EOWFIUEW324EF$#^KFH@WeaFWcwC",
        description: "lorem ipsum fealwcv iof ejwafic voierwaho lf eaw feaf w&^EOWFIUEW324EF$#^KFH@WeaFWcwC &^EOWFIUEW324EF$#^KFH@WeaFWcwC fjea oeaivw ovbiawqi fioewahv", 
        isApproved: false, 
    }
]