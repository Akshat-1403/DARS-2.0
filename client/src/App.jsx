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
  UploadRecord
}  from "./pages";
// import { ContextProvider } from "./context/Context";

function App() {

  return (
    // <ContextProvider>
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
            <Route path="/upload-record" element={<UploadRecord />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    // </ContextProvider>
  )
}

export default App;