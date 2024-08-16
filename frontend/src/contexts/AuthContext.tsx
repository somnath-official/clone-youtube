import { createContext, useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext, ILoginAuthData } from "../@types/Auth";

export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: '',
  login: async () => { },
  logout: async () => { },
})

const AuthProvider = ({ children }: { children: ReactElement | null }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = async (data: ILoginAuthData) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/dashboard", { replace: true });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider