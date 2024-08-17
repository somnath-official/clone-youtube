import { createContext, useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext, ILoginAuthData } from "../@types/Auth";
import { API_ROUTES } from "../apis";
import { axiosService } from "../utils/axiosService";

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

  useEffect(() => {
    const getUser = async () => {
      console.log('Called')
      const res = (await axiosService.get(API_ROUTES.auth.user)).data
      console.log(res)
    }

    if (token && !user) getUser()
  }, [token, user])

  const login = async (data: ILoginAuthData) => {
    try {
      const res = (await axiosService.post(API_ROUTES.auth.login, data)).data
      
      if (res) {
        setToken(res.accessToken)
        localStorage.setItem("token", res.accessToken)
        navigate("/dashboard", { replace: true })
        return
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