"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for the auth page itself
    if (pathname === "/auth") {
      setIsAuthenticated(true);
      return;
    }

    const isAuth = localStorage.getItem("mission2050_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/auth");
    }
  }, [pathname, router]);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0A1628",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(0, 212, 170, 0.2)",
            borderTopColor: "#00D4AA",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
