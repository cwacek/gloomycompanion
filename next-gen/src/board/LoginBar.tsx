import { useAuth0 } from "../context/AuthWrapper";
import React from "react"

const LoginBar : React.SFC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect!({})
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && <button onClick={() => logout!()}>Log out</button>}
    </div>
  );
};

export default LoginBar;