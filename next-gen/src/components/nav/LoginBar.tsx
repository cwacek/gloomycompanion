import { useAuth0 } from "../../context/AuthWrapper";
import React from "react"

const LoginBar : React.SFC<{className : string}> = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={props.className} >
      {!isAuthenticated && (
        <button className="btn-blue"
          onClick={() =>
            loginWithRedirect!({})
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && <button className="btn-blue" onClick={() => logout!()}>Log out</button>}
    </div>
  );
};

export default LoginBar;