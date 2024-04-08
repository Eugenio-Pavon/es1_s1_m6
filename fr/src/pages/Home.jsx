import React from "react";
import MainContent from "../components/homepage/MainContent";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const session = JSON.parse(localStorage.getItem("auth"));
  console.log(session);
  const decodedSession = jwtDecode(session);
  console.log(decodedSession);

  return <MainContent />;
};

export default Home;
