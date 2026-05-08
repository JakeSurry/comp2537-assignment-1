import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Form from "../components/Form";

const LogInPage = () => {
  const { login, error, isLoading, clearError } = useAuthStore();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await login(name, password, rememberMe);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-300">
          Log In
        </h1>

        <Form
          error={error}
          isLoading={isLoading}
          onSubmit={handleLogIn}
          submitText={"Log In"}
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
          <label className="flex items-center gap-2 mt-4 ml-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-red-300 cursor-pointer"
            />
            <span className="text-gray-400 text-sm">Remember me</span>
          </label>
        </Form>
        <div className="px-8 py-4 mt-2 flex justify-center">
          <p className="text-gray-300">
            {" "}
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-red-300 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LogInPage;
