import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const RegisterPage = () => {
  const { register, error, isLoading, clearError } = useAuthStore();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(name, password);
      setShowSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-300">
          Create Account
        </h1>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="w-full text-center text-red-500 font-semibold mt-2">
              {error}
            </p>
          )}
          <button
            className="w-full text-xl font-bold mt-4 p-4 rounded-xl text-red-300 border-2 border-red-300 hover:cursor-pointer hover:bg-red-300 hover:text-gray-700 hover:ring-2 hover:ring-red-300 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size="24" />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="px-8 py-4 mt-2 flex justify-center">
          <p className="text-gray-300">
            {" "}
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-300 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-300 mb-2">
              Account created
            </h2>
            <p className="text-gray-400 mb-6">
              You can now log in with your credentials
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full text-xl font-bold p-4 rounded-xl text-red-300 border-2 border-red-300 hover:cursor-pointer hover:bg-red-300 hover:text-gray-700 transition duration-200"
            >
              Continue to login
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegisterPage;
