import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  SharedLayout, 
  // UploadPage, 
  // ProtectedPage,
  // StudentPage, 
  // AddStudentPage,
  NotFoundPage, 
  LandingPage,
  ViewRecordPage,
  UploadRecord,
  SelectRoles,
  Home,
  AddStudentPage,
  AddInstitutePage,
  ViewSingleRecordPage
}  from "./pages";
import { ContextProvider } from "./context/context";

function App() {

  return (
    <ContextProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<SharedLayout />} > 
            <Route index element={<LandingPage />} />
              {/* <Route path="records">
                <Route index element={<UploadPage />} />
                <Route 
                  path="add" 
                  element={
                    <ProtectedPage>
                      <AddStudentPage />
                    </ProtectedPage>
                  } 
                />
                <Route path=":studentId" element={<StudentPage />} />
              </Route> */}
            <Route path="/view-record" element={<ViewRecordPage />} />
            <Route path="/view-record/:recordId" element={<ViewSingleRecordPage />} />
            <Route path="/upload-record" element={<UploadRecord />} />
            <Route path="/select-roles" element={<SelectRoles />} />
            <Route path="/student" element={<Home />} />
            <Route path="/add-student-details" element={<AddStudentPage />} />
            <Route path="/add-institute-details" element={<AddInstitutePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App;