import React from "react";
import { Button} from 'react-bootstrap';
import { useMoralis } from "react-moralis";
import { navigate } from "@reach/router";


function SignOutButton() {
    const { logout, isAuthenticating } = useMoralis();

    let urlRoute = "/home";

    function handleClick() {
      navigate(`${urlRoute}`)
    }
    
  
    return (
        <Button onClick={() => logout({ onComplete: () => handleClick()})} disabled={isAuthenticating} className="btn-main">Log out</Button>
      );
  }
  
export default SignOutButton;