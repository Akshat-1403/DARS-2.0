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
  ProtectedPage,
} from "./pages";
import { AVAILABLE_ROLES } from "./context/context";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/view-record" element={<ViewRecordPage />} />
          <Route
            path="/view-record/:recordId"
            element={<ViewSingleRecordPage />}
          />
          <Route
            path="/add-record"
            element={
              <ProtectedPage requiredRole={AVAILABLE_ROLES.INSTITUTE}>
                <UploadRecord />
              </ProtectedPage>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedPage requiredRole={AVAILABLE_ROLES.STUDENT}>
                <Home />
              </ProtectedPage>
            }
          />
          <Route path="/add-student-details" element={<AddStudentPage />} />
          <Route path="/add-institute-details" element={<AddInstitutePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
