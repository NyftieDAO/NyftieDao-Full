import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { Link, navigate } from '@reach/router';
import Web3 from 'web3';
import dynamicSplitter from "../../abi/DynamicSplitter.json";
import govToken from "../../abi/GovToken.json";
import governanceTimeLock from "../../abi/GovernanceTimeLock.json";
import governorContract from "../../abi/GovernorContract.json";
import { 
    Card,
    Row,
    Col,
    Spinner
    } from 'react-bootstrap';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const NavLink = props => (
    <Link 
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? 'active' : 'non-active',
        };
      }}
    />
  );
  
const web3 = new Web3(window.ethereum);

function Button({ isLoading, children, ...props }) {
  return (
    <button type="button" className="btn-main" {...props}>
      {isLoading ? <Spinner animation="border" /> : children}
    </button>
  );
}

const Collection= function(props) {

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

   const { user, Moralis } = useMoralis();
  // let userAddress = ""

  // if (!user) {
  //   userAddress = "not signed in"
  // }
  // else {
  //   userAddress = user.get("ethAddress")
  // }

  // Create token instance
  let tokenContract = new web3.eth.Contract(
    govToken.abi
    );
  tokenContract.options.data = govToken.bytecode;

  // Create timeLock instance
  let timeLock = new web3.eth.Contract(
    governanceTimeLock.abi
    );
    timeLock.options.data = governanceTimeLock.bytecode;

  // Create governor instance
  let governor = new web3.eth.Contract(
    governorContract.abi
    );
    governor.options.data = governorContract.bytecode;


  let splitterAdddressLocation = localStorage.getItem('splitter');

  const testWeb3 = () => {
    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const supply = document.getElementById("supply").value;

    tokenContract.deploy({
        arguments: [name, symbol, splitterAdddressLocation, supply]
      })
      .send({
        from: window.ethereum.selectedAddress
      })
      .then(function(newContractInstance){

        localStorage.setItem('token', newContractInstance.options.address);

        setIsButtonLoading(false);
    });
  }; 

  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{height: "100vh", padding: "0 0 0 0"}}>
        <Card style={{margin: "7rem"}}>
            <h2 className="text-center" style={{margin: "3rem 0 3rem 0"}}>Create Your Governance Token</h2>
            <div className="field-set" style={{margin: "0 5rem 0 5rem"}}>
                <Row>
                    <Col sm={8}>
                        <h5>Token Name</h5>
                        <input type="text" name="token_name" id="name" className="form-control" placeholder="e.g. 'Dogecoin'" />
                    </Col>
                    <Col sm={4}>
                        <h5>Token Symbol</h5>
                        <input type="text" name="token_symbol" id="symbol" className="form-control" placeholder="e.g. 'D'" />
                    </Col>
                </Row>
                <div className="spacer-10"></div>

                <h5>Initial Supply</h5>
                <p>This is the number of tokens that you will mint to yourself initally. This excludes the tokens you will mint for sale in your ICO. e.g. If you want a total supply of 100,00 and you want to own 50% of your token supply you would mint 50,000 tokens then sell 50,000 in your ICO</p>
                <input type="number" name="token_symbol" id="supply" className="form-control" placeholder="50000" />

                <Button
                  style={{margin: "1rem auto"}}
                  onClick={() => {
                    setIsButtonLoading(true);
                    testWeb3();
                  }}
                  isLoading={isButtonLoading}
                >
                  Deploy Governance Token
                </Button>
            </div>
            <NavLink to={`/launchpad/NFT`} style={{textAlign: "end", margin: "1rem"}}>
                Step 2: Create NFT Contract
                <span aria-hidden="true" className="arrow_carrot-right"></span>
            </NavLink>  
        </Card>
    </section>

  </div>
  );
}
export default Collection;

