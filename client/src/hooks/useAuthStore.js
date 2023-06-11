import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispacth = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispacth(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispacth(onLogin({ name: data.user.name, uid: data.user._id }));
    } catch (error) {
      dispacth(onLogout("Email or password incorrect"));
      console.log(error);
      setTimeout(() => {
        dispacth(clearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispacth(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log({ data });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispacth(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispacth(onLogout(error.response.data?.message || "--"));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispacth(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      console.log({ data });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispacth(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispacth(onLogout());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
  };
};
