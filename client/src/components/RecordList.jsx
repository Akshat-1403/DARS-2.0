import React, { useState, useEffect } from 'react';
import EducationContract from "../contracts/EducationContract.json";
import getWeb3 from "../utils/getWeb3";
import '../CSS/StudentList.css';

const RecordList = () => {
    const [details, setDetails] = useState([]);
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);

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
                await fetchRecordDetails(instance, accounts);
            } catch (error) {
                alert(`Failed to load web3, accounts, or contract. Check console for details.`);
                console.error(error);
            }
        };

        initWeb3();
    }, []);

    const fetchRecordDetails = async (contractInstance, accounts) => {
        try {
            const response = await contractInstance.methods.getAllrecordDetails(accounts[0]).call();
            setDetails(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching record details:", error);
        }
    };

    const renderRecords = () => {
        if (!details.length) {
            return (
                <div className="error">
                    <h3>No records!</h3>
                </div>
            );
        }

        return details.map((arr) => {
            if (arr.record_id !== 0) {
                const toLink = `http://127.0.0.1:5001/ipfs/bafybeianwe4vy7sprht5sm3hshvxjeqhwcmvbzq73u55sdhqngmohkjgs4/#/explore/${arr.ipfsHash}`;
                const download = `http://localhost:8080/ipfs/${arr.ipfsHash}`;

                return (
                    <div className="card" key={arr.record_id}>
                        <div className="row listItem">
                            <div className="col s3 black-text">
                                <h6>{arr.record_id}</h6>
                            </div>
                            <div className="col s3 black-text">
                                <h6>{arr.record_name}</h6>
                            </div>
                            <div className="col s3 black-text">
                                <h6>{arr.description}</h6>
                            </div>
                            <div className="col s3 black-text">
                                <h6>{arr.timestamp}</h6>
                            </div>
                        </div>
                        <a href={toLink}>
                            <button type="button" className="dropbtn1">IPFS</button>
                        </a>
                        <a href={download}>
                            <button type="button" className="dropbtn1">Download</button>
                        </a>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="notes">
            {renderRecords()}
        </div>
    );
};

export default RecordList;