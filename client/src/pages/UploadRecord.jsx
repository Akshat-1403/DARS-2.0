import { useState, useEffect } from 'react';
// import ipfs from '../ipfs.js';

// import EducationContract from "../contracts/EducationContract.json";
// import getWeb3 from "../utils/getWeb3.js";

export default function UploadRecord(props) {

//   const [ipfsHash, setIpfsHash] = useState('');
//   const [buffer, setBuffer] = useState(null);
  const [recordIdState, setRecordId] = useState("");
  const [address, setAddress] = useState('');
  const [recordName, setRecordName] = useState('');
  const [desc, setDesc] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const generateTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    const hour = (date.getHours() + 100).toString().substring(1);
    const mins = (date.getMinutes() + 100).toString().substring(1);
    const sec = (date.getSeconds() + 100).toString().substring(1);
    return `${year}-${month}-${day} ${hour}:${mins}:${sec}`;
  };

  useEffect(() => {
    const t = setInterval(() => {
        setTimestamp(generateTimestamp());
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    // reader.onloadend = () => setBuffer(Buffer(reader.result));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // ipfs.files.add(buffer, (error, result) => {
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }
    //   contract.methods.addReport(recordId, address, recordName, desc, timestamp, result[0].hash)
    //     .send({ from: accounts[0] });
    // });
  };


  return (
    <div className='w-full flex justify-between items-start'>
      <img src='/upload-illustration.svg' alt='upload' className='w-96 mt-20'/>
      <div className='p-4 border border-black rounded-2xl'>
      <h4 className="text-2xl font-semibold">
        Upload Education Reports
      </h4>
      <div className="my-4">
        <form onSubmit={onSubmit} id="donateForm" className="space-y-6">
          <div className="flex flex-col gap-1 md:w-1/2">
            <label htmlFor="record_id" className="block text-sm font-medium text-gray-700">
                Institute ID
            </label>
            <input 
              className="w-[36vw] border border-gray-300 rounded-md p-2" 
              type="text" 
              id="record_id" 
              name="record_id" 
              placeholder="Enter record id" 
              onChange={(e) => setRecordId(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1 md:w-1/2 md:w-1/2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Student Address Key
            </label>
            <input 
              className="w-[36vw] border border-gray-300 rounded-md p-2" 
              type="text" id="address" 
              name="address" 
              placeholder="Enter Student Address key" 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1 md:w-1/2 md:w-3/4">
            <label htmlFor="record_name" className="block text-sm font-medium text-gray-700">
              Record Name
            </label>
            <input 
              className="w-[36vw] border border-gray-300 rounded-md p-2" 
              type="text" 
              id="record_name" 
              name="record_name" 
              placeholder="Type record name." 
              onChange={(e) => setRecordName(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1 md:w-1/2">
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input 
              className="w-[36vw] border border-gray-300 rounded-md p-2" 
              type="text" id="desc" name="desc" 
              placeholder="One line description" 
              onChange={(e) => setDesc(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1 md:w-3/4">
            <label htmlFor="payment" className="block text-sm font-medium text-gray-700">Documents (upload in .zip or .rar format)</label>
            <input 
              className="w-[36vw] border border-gray-300 rounded-md p-2" 
              type="file" 
              accept="application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream" 
              onChange={captureFile} 
            />
          </div>

          <div className="flex flex-col gap-1 md:w-1/2">
            <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">TIMESTAMP</label>
            <input 
              value={timestamp} 
              className="w-[36vw] border border-gray-300 rounded-md p-2" 
              readOnly 
              type="text" 
              id="timestamp" 
              name="timestamp" 
              required 
            />
          </div>

          <div className="flex justify-start mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Upload to Blockchain</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};
