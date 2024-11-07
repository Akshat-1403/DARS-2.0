// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract EducationContract {

    // Structure to store institute details
    struct Institute {
        string name;
        string location;
        bool exists;
    }

    // Structure to store student details
    struct Student {
        string name;
        bool exists;
    }

    // Structure to store document details
    struct Document {
        address instituteAddress;
        address studentAddress;
        string title;
        string description;
        bool isApproved;
        bytes32 docHash;
    }

    // Mappings to store the details
    mapping(address => Institute) public institutes; // institute address -> Institute details
    mapping(address => Student) public students;     // student address -> Student details
    mapping(bytes32 => Document) public documents;   // document hash -> Document details
    mapping(address => bytes32[]) public studentDocuments; // student address -> array of document hashes

    // Modifier to restrict access to only registered institutes
    modifier onlyInstitute() {
        require(institutes[msg.sender].exists, "Only institutes can perform this action");
        _;
    }

    modifier onlyStudent() {
        require(students[msg.sender].exists, "Only students can perform this action");
        _;
    }

    function getRole() public view returns (uint8) {
        if (students[msg.sender].exists) return 0;
        if (institutes[msg.sender].exists) return 1;
        return 2;
    }

    // Function to add or update institute details
    function addInstitute(string memory name, string memory location) public {
        require(!students[msg.sender].exists, "Already a student.");
        require(!institutes[msg.sender].exists, "Already a institute.");
        institutes[msg.sender] = Institute(name, location, true);
    }

    // Function to add or update student details
    function addStudent(string memory name) public {
        require(!students[msg.sender].exists, "Already a student.");
        require(!institutes[msg.sender].exists, "Already a institute.");
        students[msg.sender] = Student(name, true);
    }

    // Function to upload a document (only by institutes)
    function uploadDoc(address studentAddress, bytes32 docHash, string memory docTitle, string memory docDesc) public onlyInstitute {
        require(students[studentAddress].exists, "Student does not exist");

        // Add document to the documents map
        documents[docHash] = Document({
            instituteAddress: msg.sender,
            studentAddress: studentAddress,
            title: docTitle,
            description: docDesc,
            isApproved: false,
            docHash : docHash
        });

        // Link document to the student
        studentDocuments[studentAddress].push(docHash);
    }

    // Function for a student to approve a document
    function approveRecord(bytes32 docHash) public {
        Document storage doc = documents[docHash];
        require(doc.studentAddress == msg.sender, "Only the student associated with this record can approve it");
        require(!doc.isApproved, "Document is already approved");

        // Approve the document
        doc.isApproved = true;
    }

    // Function to get details of a specific institute
    function getInstituteDetails(address instituteAddress) public view returns (string memory name, string memory location) {
        require(institutes[instituteAddress].exists, "Institute does not exist");
        Institute memory institute = institutes[instituteAddress];
        return (institute.name, institute.location);
    }

    // Function to get details of a specific student
    function getStudentDetails(address studentAddress) public view returns (string memory name) {
        require(students[studentAddress].exists, "Student does not exist");
        return students[studentAddress].name;
    }

    // Function to get a single document record
    function getSingleRecord(bytes32 docHash) public view returns (address instituteAddress, address studentAddress, string memory title, string memory description, bool isApproved) {
        Document memory doc = documents[docHash];
        require(doc.instituteAddress != address(0), "Document does not exist");

        return (doc.instituteAddress, doc.studentAddress, doc.title, doc.description, doc.isApproved);
    }

    // Function to get all documents associated with a student
    function getStudentRecords(address studentAddress) public view onlyStudent returns (Document[] memory) {
        uint256 docCount = studentDocuments[studentAddress].length;
        
        Document[] memory completeDocuments = new Document[](docCount);
    
        for (uint256 i = 0; i < docCount; i++) {
            bytes32 docHash = studentDocuments[studentAddress][i];
            completeDocuments[i] = documents[docHash];
        }
        
        return completeDocuments;
    }


    // Define a struct for verification requests
    struct VerificationRequest {
        address verifier;        // Address of the verifier (employee or third-party)
        bytes32 docHash;         // Document hash for which verification is requested
        bool isApproved;         // Status of the verification request
    }

    // Mapping to store verification requests for each student
    mapping(address => VerificationRequest[]) public verificationRequests;

    // Event to log verification requests
    event VerificationRequested(address indexed verifier, address indexed student, bytes32 docHash);
    event VerificationApproved(address indexed student, address indexed verifier, bytes32 docHash);

    // Function to request verification for a specific document
    function requestVerification(bytes32 docHash) public {
        require(documents[docHash].isApproved, "Document is not approved by the student");
        
        address studentAddress = documents[docHash].studentAddress;
        // Create a new verification request
        verificationRequests[studentAddress].push(VerificationRequest({
            verifier: msg.sender,
            docHash: docHash,
            isApproved: false
        }));

        // Emit an event for the verification request
        emit VerificationRequested(msg.sender, studentAddress, docHash);
    }

    // Function for the student to approve a verification request
    function approveVerificationRequest(uint requestIndex) public {
        require(students[msg.sender].exists, "Student does not exists");
        require(requestIndex < verificationRequests[msg.sender].length, "Invalid request index");

        VerificationRequest storage request = verificationRequests[msg.sender][requestIndex];
        require(!request.isApproved, "Request already approved");

        // Approve the verification request
        request.isApproved = true;

        // Emit an event for the approval
        emit VerificationApproved(msg.sender, request.verifier, request.docHash);
    }

    // Function to get pending verification requests for a student
    function getPendingVerificationRequests(address studentAddress) public view returns (VerificationRequest[] memory) {
        return verificationRequests[studentAddress];
    }
}