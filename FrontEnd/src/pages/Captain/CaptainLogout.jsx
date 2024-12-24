import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const CapLoGUT = async () => {
      setLoading(true);
      setError(null); // Reset any previous errors
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/logout`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("CapToken")}`,
            },
            withCredentials: true,
          }
        );

        if (response?.status === 200) {
          localStorage.removeItem("CapToken");
          navigate("/captain-login");
        }
      } catch (error) {
        setError("Logout failed. Please try again later.");
        console.error("Logout error:", error);
      } finally {
        setLoading(false);
      }
    };
    CapLoGUT();
  }, [navigate]);

  return (
    <div>
      {loading && <p>Logging out...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CaptainLogout;
