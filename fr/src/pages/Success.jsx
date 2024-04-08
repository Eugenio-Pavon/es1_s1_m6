import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  console.log(token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
    }
  }, []);

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div className="text-center pt-5">
      <div>succes page</div>
      <Button variant="primary" onClick={handleHomeClick}>
        Vai alla home page
      </Button>
    </div>
  );
};

export default Success;
