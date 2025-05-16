import { useLocation, useHistory } from "@docusaurus/router";
import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import siteConfig from "@generated/docusaurus.config";

const BTP_API = siteConfig.customFields.apiUrl as string;

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
  user: UserInfo | null;
  isLoading: boolean;
  token: string;
}

interface UserInfo {
  ID: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  companyId: string[];
  type: string;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  user: null,
  isLoading: true,
  token: ""
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();

  const login = async () => {
    // Redirect to login
    window.location.href = `${BTP_API}/user/login?origin_uri=${window.location.href}`;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken("");
    localStorage.removeItem("sap-btp-ai-bp-auth-token");
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      user,
      isLoading,
      token
    }),
    [isLoggedIn, login, logout, user, isLoading, token]
  );

  useEffect(() => {
    if (token > "") {
      localStorage.setItem("sap-btp-ai-bp-auth-token", token);
    } else if (localStorage.getItem("sap-btp-ai-bp-auth-token")) {
      setToken(localStorage.getItem("sap-btp-ai-bp-auth-token"));
    }
  }, [token]);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      const queryToken = params.get("t");
      let currentToken = localStorage.getItem("sap-btp-ai-bp-auth-token");

      if (queryToken) {
        setToken(queryToken);
        localStorage.setItem("sap-btp-ai-bp-auth-token", queryToken);
        currentToken = queryToken;
        history.replace(location.pathname);
      } else if (currentToken) {
        setToken(currentToken);
      } else {
        setIsLoading(false);
        return;
      }

      // console.log(`Checking auth with token: ${currentToken}`);

      if (currentToken) {
        try {
          const responseUser = await fetch(`${BTP_API}/user/getUserInfo`, {
            headers: {
              Authorization: `Bearer ${currentToken}`
            },
            mode: "cors"
          });
          // console.log(responseUser);
          if (responseUser.ok) {
            const dataUser = await responseUser.json();
            // console.log(dataUser);
            setUser(dataUser);
            setIsLoggedIn(true);
          } else {
            console.error("Failed to fetch user info, potentially invalid token");
            logout();
          }
        } catch (error) {
          console.error("Error during auth check:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [location, history]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
