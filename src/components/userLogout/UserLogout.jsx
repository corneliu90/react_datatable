import React from "react";
import apiClient from "../../service/apiClient";

const UserLogout = ({ user, setUser }) => {
  const userLogout = async () => {
    try {
      const response = await apiClient.post("/auth/logout");

      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Eroare la deconectare", error);
    }
  };

  return (
    <div
      className="user-quit position-absolute text-center"
      style={{ right: "100px", top: "50px" }}
    >
      <h4>
        Welcome,{" "}
        <span className="user-name-log fw-bolder" style={{ color: "#0d6efd" }}>
          {user.email}
        </span>
      </h4>
      <button
        type="button"
        className="btn btn-link btn-quit p-1"
        onClick={userLogout}
      >
        Quit
      </button>
    </div>
  );
};

export default UserLogout;
