import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { checkToken, login } from "./http/userAPI";
import AppLoader from "../components/AppLoader";
import { useDispatch } from "react-redux";
import { ToasterWithDrawer2 } from "../components/AppToaster/toaster";
import { setUser as setUserAction } from "../store/actions/user";
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = !!user;
  const logout = ({ redirectLocation = "" }) => {
    Cookies.remove("token");
    setUser(null);
    setIsLoading(false);
    console.log("Redirecting");
    router.push(redirectLocation || "/login");
  };
  const authenticate = async (reqData) => {
    try {
      // setIsLoading(true);
      var result = await login(reqData);
      const { data, token } = result;
      dispatch(setUserAction(data));
      setUser(data);
      Cookies.set("token", token);
    } catch (e) {
      ToasterWithDrawer2({
        title: e.message,
        body: e.response?.data?.error,
      });
      setUser(null);
      Cookies.remove("token");
    } finally {
      // setIsLoading(false);
      return result;
    }
  };
  useEffect(() => {
    if (isAuthenticated) return;

    async function checkData() {
      try {
        setIsLoading(true);
        const token = Cookies.get("token");
        if (!token) return;
        const { data, token: tokenRes } = await checkToken(token);
        dispatch(setUserAction(data));
        setUser(data);
        Cookies.set("token", tokenRes);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    checkData();
  }, []);
  useEffect(() => {
    const Component = children.type;
    // If it doesn't require auth, everything's good.
    if (!Component.requiresAuth) return;
    // If we're already authenticated, everything's good.
    if (isAuthenticated) return;
    // If we don't have a token in the cookies, logout
    const token = Cookies.get("token");
    if (!token) {
      return logout({ redirectLocation: Component.redirectUnauthenticatedTo });
    }
    // If we're not loading give the try to authenticate with the given token.
    if (!isLoading) {
      authenticate(token);
    }
  }, [isLoading, isAuthenticated, children.type.requiresAuth]);
  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        authenticate,
        logout,
        isLoading,
        isAuthenticated: !!user,
        token: Cookies.get("token"),
      },
    },
    children
  );
};
export const useAuth = () => useContext(AuthContext);
export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (
      !isAuthenticated &&
      router.pathname !== "/login" &&
      typeof window !== "undefined"
    ) {
      router.push("/login");
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      {isLoading && <AppLoader />}
      {children}
    </React.Fragment>
  );
};
