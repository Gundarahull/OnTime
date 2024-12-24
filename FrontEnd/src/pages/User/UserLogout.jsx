import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userLoGUT = async () => {
      setLoading(true);
      setError(null); // Reset any previous errors
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        
        if (response?.status === 200) {
          localStorage.removeItem("token");
          navigate("/login"); 
        }
      } catch (error) {
        setError("Logout failed. Please try again later.");
        console.error("Logout error:", error);
      } finally {
        setLoading(false);
      }
    };
    userLoGUT();
  }, [navigate]); 

  return (
    <div>
      {loading && <p>Logging out...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserLogout;

