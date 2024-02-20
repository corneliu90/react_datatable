import { useState } from "react";
import apiClient from "../../service/apiClient";
import Style from "./UserLogin.module.css";

const UserLogin = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await apiClient.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      handleLoginSuccess(user);
    } catch (error) {
      setErrorMessage(
        error.response?.data.message || "An error occurred while logging in."
      );
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className={Style.logincentre}>
      <input type="checkbox" id="show" />
      <label htmlFor="show" className={Style.showBtn}>
        View Form
      </label>
      <form onSubmit={userLogin} className={Style.container}>
        <label
          htmlFor="show"
          className="close-btn fas fa-times"
          title="close"
        ></label>
        <div className={Style.text}>Login Form</div>

        <div className={Style.data}>
          <label>Email:</label>
          <input
            className={Style.checkLogin}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={Style.data}>
          <label>Password:</label>
          <input
            className={Style.checkPassword}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className={Style.btn}>
          <div className={Style.inner}></div>
          <button type="submit" className={Style.btnSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
