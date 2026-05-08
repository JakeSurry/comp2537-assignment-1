import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Form from "../components/Form";
import PopUp from "../components/PopUp";

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-300">
          Create Account
        </h1>
        <Form
          error={error}
          isLoading={isLoading}
          onSubmit={handleSignUp}
          submitText={"Register"}
        >
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
        </Form>
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
        <PopUp
          title={"Account Created"}
          body={"You can now log in with your credentials"}
          label={"Continue to log in"}
          onAccept={() => navigate("/login")}
        />
      )}
    </motion.div>
  );
};

export default RegisterPage;
