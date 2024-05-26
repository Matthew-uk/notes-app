import React from "react";
import { ClipLoader } from "react-spinners";

interface SpinnerComponentProps {
  loading: boolean;
}
const SpinnerComponent: React.FC<SpinnerComponentProps> = ({ loading }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#3498db" loading={loading} size={50} />
    </div>
  );
};

export default SpinnerComponent;
