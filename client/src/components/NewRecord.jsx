import React, { useState, useEffect } from 'react';
import '../CSS/newRecord.css';
import GenericNavbar from './Navbar/GenericNavbar';
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

const NewRecord = () => {
    // State management with useState
    const [web3Data, setWeb3Data] = useState({
        web3: null,
        accounts: null,
        contract: null
    });

    const [formData, setFormData] = useState({
        record_id: '',
        address: '',
        timestamp: '',
        record_code: '',
        description: ''
    });

    // Helper function to get formatted timestamp
    const getFormattedTimestamp = () => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 101).toString().substring(1);
        const day = (date.getDate() + 100).toString().substring(1);
        const hour = (date.getHours() + 100).toString().substring(1);
        const mins = (date.getMinutes() + 100).toString().substring(1);
        const sec = (date.getSeconds() + 100).toString().substring(1);
        return `${year}-${month}-${day} ${hour}:${mins}:${sec}`;
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Initialize Web3 and contract
    useEffect(() => {
        const initWeb3 = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = SimpleStorageContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    SimpleStorageContract.abi,
                    deployedNetwork && deployedNetwork.address
                );

                setWeb3Data({
                    web3,
                    accounts,
                    contract: instance
                });

                // Set initial timestamp
                setFormData(prev => ({
                    ...prev,
                    timestamp: getFormattedTimestamp()
                }));
            } catch (error) {
                alert('Failed to load web3, accounts, or contract. Check console for details.');
                console.error(error);
            }
        };

        initWeb3();
    }, []);

    // Update timestamp periodically
    useEffect(() => {
        const intervalId = setInterval(() => {
            setFormData(prev => ({
                ...prev,
                timestamp: getFormattedTimestamp()
            }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { contract, accounts } = web3Data;

        if (!contract || !accounts) {
            alert('Web3 not initialized');
            return;
        }

        try {
            await contract.methods.addrecordReport(
                formData.record_id,
                formData.address,
                formData.timestamp,
                formData.record_code,
                formData.description
            ).send({ from: accounts[0] });

            // Clear form after successful submission
            setFormData(prev => ({
                ...prev,
                record_id: '',
                address: '',
                record_code: '',
                description: ''
            }));

            alert('Record successfully added to blockchain');
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Failed to add record to blockchain');
        }
    };

    return (
        <div>
            <GenericNavbar />
            <div className="container">
                <div className="row">
                    <div className="col s6">
                        <div className="card reportCard">
                            <div className="card-title cardTitle2">
                                <h4 className="cardTitle">New Record</h4>
                            </div>
                            <div className="card-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-field">
                                        <input 
                                            type="text" 
                                            id="record_id" 
                                            value={formData.record_id}
                                            onChange={handleInputChange} 
                                            required
                                        />
                                        <label htmlFor="record_id">Student ID</label>
                                    </div>
                                    <div className="input-field">
                                        <input 
                                            type="text" 
                                            id="address" 
                                            value={formData.address}
                                            onChange={handleInputChange} 
                                            required
                                        />
                                        <label htmlFor="address">Institute Address</label>
                                    </div>
                                    <div className="input-field">
                                        <input 
                                            type="text" 
                                            id="timestamp" 
                                            value={formData.timestamp}
                                            readOnly 
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input 
                                            type="text" 
                                            id="record_code" 
                                            value={formData.record_code}
                                            onChange={handleInputChange} 
                                            required
                                        />
                                        <label htmlFor="record_code">Record Name</label>
                                    </div>
                                    <div className="form-submit center">
                                        <button 
                                            type="submit" 
                                            className="dropbtn1" 
                                            style={{marginTop: "10px"}}
                                        >
                                            Upload to Blockchain
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card reportCard">
                            <div className="card-title cardTitle">
                                <h4 className="cardTitle">Enter Description</h4>
                            </div>
                            <div className="card-content">
                                <div className="input-field">
                                    <textarea 
                                        id="description" 
                                        className="textAreaHeight"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRecord;