"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Zap, Shield, Brain } from "lucide-react";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem("mission2050_auth");
    if (isAuth === "true") {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate authentication delay for effect
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password === "mission2050") {
      setAuthenticated(true);
      localStorage.setItem("mission2050_auth", "true");
      // Delay for animation
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/");
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A1628",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Glowing orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(52, 152, 219, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          animation: "pulse 5s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "20%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(155, 89, 182, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(52, 152, 219, 0.2) 100%)",
            border: "2px solid rgba(0, 212, 170, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
            boxShadow: "0 0 40px rgba(0, 212, 170, 0.3), inset 0 0 30px rgba(0, 212, 170, 0.1)",
            animation: "glow 2s ease-in-out infinite alternate",
          }}
        >
          <Brain size={50} style={{ color: "#00D4AA" }} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #00D4AA 0%, #3498DB 50%, #9B59B6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "10px",
            letterSpacing: "-1px",
            textAlign: "center",
          }}
        >
          MISSION 2050
        </h1>

        <p
          style={{
            color: "#6B7A8C",
            fontSize: "16px",
            marginBottom: "40px",
            textAlign: "center",
            maxWidth: "400px",
            lineHeight: "1.6",
          }}
        >
          Unified Intelligence Platform for Canadian Clean Energy Infrastructure
        </p>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: "rgba(22, 32, 50, 0.8)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(0, 212, 170, 0.2)",
            padding: "40px",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Security badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "30px",
              padding: "12px 20px",
              backgroundColor: "rgba(0, 212, 170, 0.1)",
              borderRadius: "30px",
              border: "1px solid rgba(0, 212, 170, 0.2)",
            }}
          >
            <Shield size={18} style={{ color: "#00D4AA" }} />
            <span style={{ color: "#00D4AA", fontSize: "13px", fontWeight: "600", letterSpacing: "1px" }}>
              SECURE ACCESS PORTAL
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                color: "#B8C5D3",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "10px",
                letterSpacing: "0.5px",
              }}
            >
              ENTER ACCESS CODE
            </label>

            <div style={{ position: "relative", marginBottom: "20px" }}>
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: error ? "#E74C3C" : "#6B7A8C",
                }}
              >
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                style={{
                  width: "100%",
                  padding: "16px 50px 16px 50px",
                  backgroundColor: "#0A1628",
                  border: `2px solid ${error ? "#E74C3C" : "rgba(0, 212, 170, 0.3)"}`,
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  if (!error) e.target.style.borderColor = "#00D4AA";
                }}
                onBlur={(e) => {
                  if (!error) e.target.style.borderColor = "rgba(0, 212, 170, 0.3)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#6B7A8C",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div
                style={{
                  color: "#E74C3C",
                  fontSize: "13px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>⚠</span> Invalid access code. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={loading || authenticated}
              style={{
                width: "100%",
                padding: "16px",
                background: authenticated
                  ? "linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)"
                  : "linear-gradient(135deg, #00D4AA 0%, #00B894 100%)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0, 212, 170, 0.3)",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {authenticated ? "ACCESS GRANTED" : "AUTHENTICATING..."}
                </>
              ) : (
                <>
                  <Zap size={20} />
                  INITIALIZE ACCESS
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#4A5568",
            fontSize: "12px",
          }}
        >
          <span>© 2050 Mission Platform</span>
          <span>•</span>
          <span>Powered by AI</span>
          <span>•</span>
          <span>Canada</span>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 40px rgba(0, 212, 170, 0.3), inset 0 0 30px rgba(0, 212, 170, 0.1);
          }
          100% {
            box-shadow: 0 0 60px rgba(0, 212, 170, 0.5), inset 0 0 40px rgba(0, 212, 170, 0.2);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        input::placeholder {
          color: #4a5568;
        }
      `}</style>
    </div>
  );
}
