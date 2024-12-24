import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import Cookies from "js-cookie";

const UserProtectedWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token =
          localStorage.getItem("AuthToken") || Cookies.get("authToken");

        if (!token) {
          // Redirect if no token is available
          navigate("/login", { state: { from: location } });
          return;
        }

        // Validate token with the server
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { withCredentials: true }
        );

        if (response?.status === 200) {
          setIsAuthenticated(true);
        } else {
          navigate("/login", { state: { from: location } });
        }
      } catch (error) {
        console.error("Token validation failed", error);
        navigate("/login", { state: { from: location } });
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [navigate, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering children if not authenticated
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
