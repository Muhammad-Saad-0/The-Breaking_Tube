import  React , { useState, useContext ,useEffect} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth } from '../Data/base'
const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}
export function useAuthUpdate(){
    return useContext(AuthUpdateContext)
}
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  return (
    <AuthContext.Provider value={authUser}>
      <AuthUpdateContext.Provider value={userSignOut}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}