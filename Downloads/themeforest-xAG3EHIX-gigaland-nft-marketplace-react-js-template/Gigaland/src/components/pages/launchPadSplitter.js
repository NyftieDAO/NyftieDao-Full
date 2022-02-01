import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";
import { Link, navigate } from '@reach/router';
import Web3 from 'web3';
import dynamicSplitter from "../../abi/DynamicSplitter.json";
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

  // Create splitter instance
  let splitterContract = new web3.eth.Contract(
    dynamicSplitter.abi,
    "0x3f6edd3cac9c596499dd8864fa120e1466a96d9d"
    );
  splitterContract.options.data = dynamicSplitter.bytecode;

  const testWeb3 = () => {
    splitterContract.deploy({
        arguments: [[window.ethereum.selectedAddress], [10]]
    })
    .send({
        from: window.ethereum.selectedAddress
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address

        localStorage.setItem('splitter', newContractInstance.options.address);

        setIsButtonLoading(false);
    });
  }; 

  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{padding: "0 0 0 0"}}>
        <Card style={{margin: "7rem"}}>
            <h2 className="text-center" style={{margin: "3rem 0 3rem 0"}}>Create Your Profit Sharing Contract</h2>
            <div className="field-set" style={{margin: "0 5rem 0 5rem"}}>
                <h5>Purpose</h5>
                <p>This contract will work as a vault to store any royalty profits your NFTs generate. 
                  After you do your Intial Dao Launch "IDL" anyone holding your governace tokens will be 
                  able to pull out their portion of the profits. Each persons portion is decided by the 
                  number of tokens they hold. e.g. If there are 100 governace tokens and someone owns 10 tokens they are entitled to 10% of the profit vault.</p>

                <Button
                  style={{margin: "1rem auto"}}
                  onClick={() => {
                    setIsButtonLoading(true);
                    testWeb3();
                  }}
                  isLoading={isButtonLoading}
                >
                  Deploy Profit Splitter
                </Button>
            </div>
            <NavLink to={`/launchpad/token`} style={{textAlign: "end", margin: "1rem"}}>
                Step 2: Create Governance Token
                <span aria-hidden="true" className="arrow_carrot-right"></span>
            </NavLink>  
        </Card>
    </section>

  </div>
  );
}
export default Collection;

