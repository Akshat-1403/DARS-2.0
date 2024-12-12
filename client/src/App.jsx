import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  SharedLayout,
  NotFoundPage,
  LandingPage,
  ViewRecordPage,
  UploadRecord,
  Home,
  AddStudentPage,
  AddInstitutePage,
  ViewSingleRecordPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
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
          <Route
            path="/view-record/:recordId"
            element={<ViewSingleRecordPage />}
          />
          <Route path="/upload-record" element={<UploadRecord />} />
          <Route path="/student" element={<Home />} />
          <Route path="/add-student-details" element={<AddStudentPage />} />
          <Route path="/add-institute-details" element={<AddInstitutePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
