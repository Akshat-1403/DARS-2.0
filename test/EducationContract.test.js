const EducationContract = artifacts.require("./EducationContract.sol");

contract("EducationContract", accounts => {
  let instance;
  
  const studentAccount = accounts[1];
  const instituteAccount = accounts[2];
  const otherAccount = accounts[3];

  before(async ()=>{
    instance = await EducationContract.deployed();
  })
  // it("test", async()=>{
  //   const studentName = "John Doe";
  //   const instituteName = "Tech Institute";
  //   const instituteLocation = "City Center";

  //   // Add student and institute for testing purposes
  //   await instance.addStudent(studentName, { from: studentAccount });
  //   await instance.addInstitute(instituteName, instituteLocation, { from: instituteAccount });
  
  //   const docHash = web3.utils.keccak256("Sample Document");
  //   const docTitle = "Sample Title";
  //   const docDesc = "Sample Description";
  //   await instance.uploadDoc(studentAccount, docHash, docTitle, docDesc, { from: instituteAccount });
  //   const document = await instance.getSingleRecord(docHash, { from: studentAccount });
  //   console.log(document[0], document[1])
  // })

  describe("student and institute can be added", async () => {
    const studentName = "John Doe";
    const instituteName = "Tech Institute";
    const instituteLocation = "City Center";

    before(async () => {
      // Add student and institute for testing purposes
      await instance.addStudent(studentName, { from: studentAccount });
      await instance.addInstitute(instituteName, instituteLocation, { from: instituteAccount });
    });

    it("should add them correctly", async () => {
      // Retrieve and verify student details using getStudentDetails
      const studentDetails = await instance.getStudentDetails(studentAccount);
      assert.equal(studentDetails, studentName, "Student name should match");

      // Retrieve and verify institute details using getInstituteDetails
      const instituteDetails = await instance.getInstituteDetails(instituteAccount);
      assert.equal(instituteDetails[0], instituteName, "Institute name should match");
      assert.equal(instituteDetails[1], instituteLocation, "Institute location should match");
    });

    it("has correct roles", async () => {
      // Verify roles for the student account
      const studentRole = await instance.getRole({ from: studentAccount });
      assert.equal(studentRole.toNumber(), 0, "Student account should have the correct role");

      // Verify roles for the institute account
      const instituteRole = await instance.getRole({ from: instituteAccount });
      assert.equal(instituteRole.toNumber(), 1, "Institute account should have the correct role");

      // Verify role for an unregistered account
      const unregisteredRole = await instance.getRole({ from: accounts[3] });
      assert.equal(unregisteredRole.toNumber(), 2, "Unregistered account should have the correct role");
    });
  });

  describe("Institute should be able to upload docs", async () => {
    const docHash = web3.utils.keccak256("Sample Document");
    const docTitle = "Sample Title";
    const docDesc = "Sample Description";

    it("should allow institute to add docs", async () => {
      await instance.uploadDoc(studentAccount, docHash, docTitle, docDesc, { from: instituteAccount });
      const document = await instance.getSingleRecord(docHash, { from: studentAccount });
      assert.equal(document[0], instituteAccount, "Document should be linked to the correct institute");
      assert.equal(document[1], studentAccount, "Document should be linked to the correct student");
      assert.equal(document[2], docTitle, "Document title should match");
      assert.equal(document[3], docDesc, "Document description should match");
      assert.isFalse(document[4], "Document should not be approved initially");
    });

    it("should not allow a non-institute address to upload doc", async () => {
      try {
        await instance.uploadDoc(studentAccount, docHash, docTitle, docDesc, { from: otherAccount });
        assert.fail("Non-institute address should not be able to upload documents");
      } catch (error) {
        assert.isTrue(true, "Expected revert for non-institute address");
      }
    });

    it("doesn't allow to upload doc if student does not exist", async () => {
      const nonExistentStudent = accounts[4];
      try {
        await instance.uploadDoc(nonExistentStudent, docHash, docTitle, docDesc, { from: instituteAccount });
        assert.fail("Should not allow document upload for non-existent student");
      } catch (error) {
        assert.isTrue(true, "Expected revert for non-existent student");
      }
    });

    it("does not allow to upload doc that already exists", async () => {
      try {
        await instance.uploadDoc(studentAccount, docHash, docTitle, docDesc, { from: instituteAccount });
        assert.fail("Should not allow document upload for duplicate hash");
      } catch (error) {
        assert.isTrue(true, "Expected revert for duplicate document hash");
      }
    });
  });

  describe("student should be able to approve records", async () => {
    const docHash = web3.utils.keccak256("Sample Document1");
    const docTitle = "Sample Title";
    const docDesc = "Sample Description";
  
    before(async () => {
      console.log("Initializing document upload...");
      await instance.uploadDoc(studentAccount, docHash, docTitle, docDesc, { from: instituteAccount });
    });
  
    it("should be approved", async () => {
      await instance.approveRecord(docHash, { from: studentAccount });
      const document = await instance.getSingleRecord(docHash, { from: studentAccount });
      assert.isTrue(document.isApproved, "Document should be approved");
    });
  
    it("should not allow to approve doc by other address", async () => {
      try {
        await instance.approveRecord(docHash, { from: otherAccount });
        assert.fail("Other accounts should not be able to approve the document");
      } catch (error) {
        assert.include(
          error.message,
          "Only the student associated with this record can approve it",
          "Expected revert for non-student approver"
        );
      }
    });
  
    it("can provide all the docs for a student", async () => {
      const studentDocs = await instance.getStudentRecords(studentAccount, { from: studentAccount });
      assert.equal(studentDocs.length, 1, "Student should have one document");
      assert.equal(studentDocs[0].title, docTitle, "Document title should match");
      assert.equal(studentDocs[0].description, docDesc, "Document description should match");
      assert.isTrue(studentDocs[0].isApproved, "Document should be approved");
    });
  });
});