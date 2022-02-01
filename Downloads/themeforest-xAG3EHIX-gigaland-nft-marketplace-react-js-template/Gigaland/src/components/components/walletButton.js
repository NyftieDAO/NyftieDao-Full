import React from "react";
import { Button} from 'react-bootstrap';
import { useMoralis } from "react-moralis";
import { navigate } from "@reach/router";


function WalletButton() {
    const { authenticate, isAuthenticating, user } = useMoralis();

    let urlRoute = "";

    if (!user) {
      let urlRoute = "";
    }
    else {
      let urlRoute = `/User/${user.get("ethAddress")}`;
    }

    function handleClick() {
      navigate(urlRoute)
    }
    
    return (
        <Button onClick={() => authenticate({ onComplete: () => handleClick()})} disabled={isAuthenticating} className="btn-main">Connect Wallet</Button>
      );
  }
  
export default WalletButton;