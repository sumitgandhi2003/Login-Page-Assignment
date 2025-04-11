import { useLocation } from "react-router-dom";

const LoginSuccess = () => {
  const location = useLocation();
  const email = location.state?.email || "User";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{email}</span>!
        </h1>
        <p className="text-gray-600 text-lg">
          You have successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default LoginSuccess;
