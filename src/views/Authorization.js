import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";

const Authorization = () => {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const checkIsAuth = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user?._id) {
      setIsAuth(true);
      navigate("/");
    }
  };
  console.log("auth", isAuth);

  useEffect(() => {
    checkIsAuth();
  },[]);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }}  replace/>
  );
};

export default Authorization;
