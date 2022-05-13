import React, { useState, useMemo, useEffect } from 'react';
import { Text, Button, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthScreen from './src/screens/Auth'
import AuthContext from './src/context/AuthContext';
import { setTokenAPI, getTokenAPI, deleteTokenAPI } from "./src/api/token"
import jwtDecode from 'jwt-decode';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async()=>{
      const token = await getTokenAPI();
      if(token){
        setAuth({
          token, 
          idUser: jwtDecode(token).id
        });
      }else{
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenAPI(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };

  const logout = () => {
    if(auth){
      deleteTokenAPI();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout
    }),
    [auth]
  );

  if(auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
        <PaperProvider>
             {auth ? <AppNavigation/> : <AuthScreen/>}
        </PaperProvider>
    </AuthContext.Provider>
  );
}