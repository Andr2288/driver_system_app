import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin text-primary" />
    </div>
  );
};

export default LoadingSpinner;
