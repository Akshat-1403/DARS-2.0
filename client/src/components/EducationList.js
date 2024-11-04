import React, { useState, useEffect } from 'react';
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import '../CSS/StudentList.css';

const EducationList = () => {
  const [details, setDetails] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3Instance = await getWeb3();

        // Use web3 to get the user's accounts.
        const userAccounts = await web3Instance.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to state.
        setWeb3(web3Instance);
        setAccounts(userAccounts);
        setContract(contractInstance);

        // Fetch initial data.
        if (contractInstance) {
          getVal(contractInstance, userAccounts[0]);
        }
      } catch (error) {
        alert('Failed to load web3, accounts, or contract. Check console for details.');
        console.error(error);
      }
    };

    init();
  }, []);

  const getVal = async (contractInstance, account) => {
    try {
      const response = await contractInstance.methods.getAllrecordDetails(account).call();
      setDetails(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const records = details.length ? (
    details.map((record) => {
      if (record.record_id !== 0) {
        const toLink = `/educationUpdate/${record.record_id}`;
        return (
          <div className="card" key={record.record_id}>
            <div className="row listItem">
              <div className="col s3 black-text">
                <h6>{record.record_id}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{record.record_code}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{record.description}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{record.timestamp}</h6>
              </div>
            </div>
            <a href={toLink}>
              <button type="button" className="dropbtn1">Add</button>
            </a>
          </div>
        );
      }
      return null;
    })
  ) : (
    <div className="error">
      <h3>No Records!</h3>
    </div>
  );

  return <div className="notes">{records}</div>;
};

export default EducationList;
