import { ClipLoader } from "react-spinners";

const Loader = ({ loading, size, color, className }) => {
  return <ClipLoader className={className} loading={loading} size={size} color={color} />;
};

export default Loader;