import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        backgroundColor: "#ffffffff",
        borderBottom: "1px solid #e5e7eb", // thin light-gray border
        boxSizing: "border-box",
        width: "100%",
        height: 64, // px
        padding: 0,
        margin: 0,
      }}
    >
      <h1
        style={{
          marginLeft: "20px",
          fontSize: "2rem",
          fontWeight: "700",
          color: "#d78888ff",
          cursor: "pointer", // shows it's clickable
        }}
        onClick={() => navigate("/")}
      >
        <img
          src="/logo_Nua.png" // <-- put your logo path here
          alt="Logo"
          style={{
            display: "flex",
            alignItems: "center",
            height: "95px", // scale logo size
            cursor: "pointer",
            marginTop: "-14px",
          }}
          onClick={() => navigate("/")}
        />
      </h1>
    </div>
  );
};

export default Header;
