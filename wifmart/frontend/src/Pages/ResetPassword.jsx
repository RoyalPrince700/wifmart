import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import SummaryApi from "../common";
import Logo from "../components/Logo";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useParams(); // Retrieve token from URL params
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
        method: SummaryApi.resetPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="reset-password"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto container p-4 mt-16 lg:mt-0">
        <div
          className="flex justify-center mb-8"
        
        >
          <Logo w="100px" h="20px" />
        </div>

        <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white mx-auto p-4 w-full max-w-md py-5 rounded-md shadow-lg"
              >
          <h1 className="text-center text-xl font-semibold mb-4">Reset Your Password</h1>
          <form
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label>New Password:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <motion.button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-4 w-full text-center
               max-w-[300px] rounded-md hover:scale-110 transition-all mx-auto block mt-6"
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ResetPassword;
