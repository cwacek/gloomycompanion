
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

interface Auth0ContextType {
        isAuthenticated : boolean
        user?: string
        loading: boolean
        popupOpen: boolean
        loginWithPopup : (params : any)=> Promise<any>
        handleRedirectCallback: ()=> any
        getIdTokenClaims: (...p : any)=>any
        loginWithRedirect:(...p : any)=>any
        getTokenSilently: (...p : any)=>any
        getTokenWithPopup: (...p : any)=>any
        logout: (...p : any)=>any

}

export const Auth0Context = React.createContext<Partial<Auth0ContextType>>({});
export const useAuth0 = () => useContext(Auth0Context);

interface providerProps {
    children : any
    onRedirectCallback : (state :any)=>any
    initOptions : Auth0ClientOptions
}

export const Auth0Provider : React.SFC<providerProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(undefined);
  const [auth0Client, setAuth0] = useState<Auth0Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(props.initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        props.onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client!.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client!.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client!.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client!.getTokenWithPopup(...p),
        logout: (...p) => auth0Client!.logout(...p)
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  );
};