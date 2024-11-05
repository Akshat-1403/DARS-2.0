import React, { useState, useEffect } from 'react';
import RecordDetailsNav from './Navbar/ViewEducation.jsx';
import { useParams } from 'react-router';
import ipfs from '../ipfs.js';

import EducationContract from "../contracts/EducationContract.json";
import getWeb3 from "../utils/getWeb3.js";

const RecordDetails = (props) => {
  const { recordId } = useParams();

  const [ipfsHash, setIpfsHash] = useState('');
  const [buffer, setBuffer] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [recordIdState, setRecordId] = useState(recordId);
  const [address, setAddress] = useState('');
  const [recordName, setRecordName] = useState('');
  const [desc, setDesc] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = EducationContract.networks[networkId];
        const instance = new web3.eth.Contract(
          EducationContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
        setTimestamp(generateTimestamp());
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    initWeb3();
  }, []);

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => setBuffer(Buffer(reader.result));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ipfs.files.add(buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      contract.methods.addReport(recordId, address, recordName, desc, timestamp, result[0].hash)
        .send({ from: accounts[0] });
    });
  };

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

  return (
    <div>
      <RecordDetailsNav recordId={recordId} />
      <h4 className="title-styled" style={{ marginTop: "40px", marginLeft: "235px", marginBottom: "25px" }}>Upload Education Reports</h4>
      <div className="container">
        <form onSubmit={onSubmit} id="donateForm" className="donate-form">
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group required">
                <label htmlFor="report_type">Institute ID</label>
                <input className="form-control" type="text" id="record_id" name="record_id" placeholder="Enter record id" onChange={(e) => setRecordId(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="form-group required">
                <label htmlFor="report_type">Student Address Key</label>
                <input className="form-control" type="text" id="address" name="address" placeholder="Enter Student Address key" onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="form-group required">
                <label htmlFor="company">Record NAME </label>
                <input className="form-control" type="text" id="record_name" name="record_name" placeholder="Type record name." onChange={(e) => setRecordName(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="form-group required">
                <label htmlFor="par_rem">DESCRIPTION</label>
                <input className="form-control" type="text" id="desc" name="desc" placeholder="One line description" onChange={(e) => setDesc(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="form-group required">
                <label htmlFor="payment">Documents (upload in .zip or .rar format)</label>
                <input className="form-control" type="file" accept="application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream" onChange={captureFile} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="form-group required">
                <label htmlFor="fee">TIMESTAMP</label>
                <input value={timestamp} className="form-control" readOnly type="text" id="timestamp" name="timestamp" required />
              </div>
            </div>
            <div className="form-submit">
              <button type="submit" className="dropbtn1" style={{ marginTop: "10px" }}>Upload to Blockchain</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordDetails;