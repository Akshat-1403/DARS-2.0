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
    mapping(address => Institute) private institutes; // institute address -> Institute details
    mapping(address => Student) private students;     // student address -> Student details
    mapping(bytes32 => Document) private documents;   // document hash -> Document details
    mapping(address => bytes32[]) private studentDocuments; // student address -> array of document hashes

    // Modifier to restrict access to only registered institutes
    modifier onlyInstitute() {
        require(institutes[msg.sender].exists, "Only institutes can perform this action");
        _;
    }

    modifier onlyStudent() {
        require(students[msg.sender].exists, "Only students can perform this action");
        _;
    }

    function getRole() external view returns (uint8) {
        if (students[msg.sender].exists) return 0;
        if (institutes[msg.sender].exists) return 1;
        return 2;
    }

    // Function to add or update institute details
    function addInstitute(string memory name, string memory location) external {
        require(!students[msg.sender].exists, "Already a student.");
        require(!institutes[msg.sender].exists, "Already a institute.");
        institutes[msg.sender] = Institute(name, location, true);
    }

    // Function to add or update student details
    function addStudent(string memory name) external {
        require(!students[msg.sender].exists, "Already a student.");
        require(!institutes[msg.sender].exists, "Already a institute.");
        students[msg.sender] = Student(name, true);
    }

    // Function to upload a document (only by institutes)
    function uploadDoc(address studentAddress, bytes32 docHash, string memory docTitle, string memory docDesc) external onlyInstitute {
        require(students[studentAddress].exists, "Student does not exist");
        require(documents[docHash].docHash != docHash, "Document with the given hash already exists");
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
    function approveRecord(bytes32 docHash) external {
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
    function getSingleRecord(bytes32 docHash) external view returns (
        address instituteAddress, 
        address studentAddress,
        string memory title,
        string memory description,
        bool isApproved,
        string memory studentName,
        string memory instituteName,
        string memory instituteLocation
    ) {
        Document memory doc = documents[docHash];
        require(doc.instituteAddress == address(0), "Document does not exist");
        studentName = getStudentDetails(doc.studentAddress);
        (instituteName, instituteLocation) = getInstituteDetails(doc.instituteAddress);
        return (
            doc.instituteAddress, 
            doc.studentAddress, 
            doc.title,
            doc.description, 
            doc.isApproved,
            studentName,
            instituteName,
            instituteLocation
        );
    }

    // Function to get all documents associated with a student
    function getStudentRecords(address studentAddress) external view onlyStudent returns (Document[] memory) {
        uint256 docCount = studentDocuments[studentAddress].length;
        
        Document[] memory completeDocuments = new Document[](docCount);
    
        for (uint256 i = 0; i < docCount; i++) {
            bytes32 docHash = studentDocuments[studentAddress][i];
            completeDocuments[i] = documents[docHash];
        }
        return completeDocuments;
    }
}