import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Logo from "../components/Logo";

const TokenVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only numeric input
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input field if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, 6); // Only take up to 6 digits
    if (/^\d{1,6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setCode(newCode);
      newCode.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      // Focus on the last field
      inputRefs.current[Math.min(newCode.length - 1, 5)].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (!/^[0-9]{6}$/.test(verificationCode)) {
      toast.error("Please enter a valid 6-digit token.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SummaryApi.verifyEmail.url, {
        method: SummaryApi.verifyEmail.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Verification successful. Redirecting to home.");
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="token-verification">
      <div className="mx-auto container p-4 mt-[100px] lg:mt-0">
        <div className="flex justify-center mb-8">
          <Logo w="120px" h="30px" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white mx-auto p-4 w-full max-w-md py-5 rounded-md shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Token</h2>
          <p className="text-center text-gray-500 mb-6">
            Enter the 6-digit code sent to your email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-1 sm:gap-2 flex-wrap">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-10 sm:w-12 h-10 sm:h-12 text-center text-xl font-bold bg-gray-100 border border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                  />
                ))}
              </div>


            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting || code.some((digit) => !digit)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg 
              shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify Token"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default TokenVerificationPage;
