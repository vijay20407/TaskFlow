import React, { useState } from "react";
import "../CSS/otp.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;
  const initialVid = location.state?.vid || "";
  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [vid, setVid] = useState(initialVid);
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(
    from === "/signup"
  );

  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:8080/api/otp/send",
          email,
        {headers: {
          'Content-Type': 'text/plain'
        }},
      );

      setVid(response.data.vid);
      setOtpSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  const handleVerify = async () => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:8080/api/otp/verify",
        {
          otp,
          vid,
        }
      );

      if (from === "/login") {
        navigate("/login/reset-password", {
          state: {
            email,
          },
        });
        return;
      }

      if (from === "/signup") {
        navigate(`/home/${response.data}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP"
      );
    }
  };

  const handleResend = async () => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:8080/api/otp/send",
        {
          email,
        }
      );

      setVid(response.data.vid);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h1 className="otp-title">
          {from === "/login"
            ? "Forgot Password"
            : "Verify OTP"}
        </h1>

        <p className="otp-subtitle">
          {from === "/login"
            ? "Enter your email to receive an OTP."
            : "Enter the OTP sent to your email."}
        </p>

        {/* EMAIL SECTION */}
        {!otpSent && (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              className="otp-input"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button
              className="verify-btn"
              onClick={handleSendOtp}
              disabled={!email}
            >
              Send OTP
            </button>
          </>
        )}

        {/* OTP SECTION */}
        {otpSent && (
          <>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(
                    /[^0-9]/g,
                    ""
                  )
                )
              }
              placeholder="Enter OTP"
              className="otp-input"
            />

            <button
              className="verify-btn"
              onClick={handleVerify}
              disabled={otp.length !== 6}
            >
              Verify OTP
            </button>

            <p className="resend-text">
              Didn't receive the OTP?{" "}
              <button
                className="resend-btn"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            </p>
          </>
        )}

        {error && (
          <p
            style={{
              color: "#ff6b6b",
              marginTop: "12px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}