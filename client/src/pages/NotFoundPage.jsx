import { Link } from "react-router-dom";
import { LoadingWrapper } from "../components";

function NotFoundPage() {
  return (
    <LoadingWrapper>
      <div className="flex items-center justify-center min-h-screen bg-primaryColor text-secondaryColor">
        <div className="text-center">
          <img src="/404.svg" alt="404 Illustration" className="mb-16 mx-auto" style={{ maxWidth: '300px' }} />
          <h1 className="text-5xl font-bold mb-8">
              404 - <span className="text-[#1D4ED8]">Page Not Found</span>
          </h1>
          <p className="text-lg mb-8">Oops! Looks like you've stumbled upon a page that doesn't exist.</p>
          <Link to="/" className="bg-white border border-[#1D4ED8] text-[#1D4ED8] font-semibold px-6 py-3 rounded-lg shadow-md">
              Go Back Home
          </Link>
        </div>
      </div>
    </LoadingWrapper>
  );
}

export default NotFoundPage;