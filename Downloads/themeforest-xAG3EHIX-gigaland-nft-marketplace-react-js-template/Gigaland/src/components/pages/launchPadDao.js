import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";
import { Link, navigate } from '@reach/router';
import Web3 from 'web3';
import governanceTimeLock from "../../abi/GovernanceTimeLock.json";
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
  let timeLockContract = new web3.eth.Contract(
    governanceTimeLock.abi
    );
    timeLockContract.options.data = governanceTimeLock.bytecode;

  const testWeb3 = () => {
    let proposersArray = document.getElementById("proposersArray");
    if (proposersArray.value == 0) {
      proposersArray = [];
    } else {
      proposersArray = proposersArray.value.split(",");
    }

    let executorsArray = document.getElementById("executorsArray");
    if (executorsArray.value == 0) {
      executorsArray = [];
    } else {
      executorsArray = executorsArray.value.split(",");
    }

    timeLockContract.deploy({
        arguments: [1, proposersArray, executorsArray]
    })
    .send({
        from: window.ethereum.selectedAddress
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address

        localStorage.setItem('timeLock', newContractInstance.options.address);

        setIsButtonLoading(false);
    });
  }; 

  function testContract() {
    let array = document.getElementById("proposersArray");
    if (array.value == 0) {
      array = [];
      console.log(array)
      console.log("array is 0");
    } else {
      array = array.value.split(",");
      console.log(array);
      setIsButtonLoading(false);
    }
  }

  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{padding: "0 0 0 0"}}>
        <Card style={{margin: "7rem"}}>
            <h2 className="text-center" style={{margin: "3rem 0 3rem 0"}}>Create Your Dao Governance Contract</h2>
            <div className="field-set" style={{margin: "0 5rem 0 5rem"}}>
            <div className="spacer-10"></div>

            <h5>Proposers </h5>
            <p>This is a list of addresses that you want to allow to submit proposals to your DAO. You can leave this blank if you would like anyone who holds tokens to be able to submit a proposal.</p>
            <strong>Must be a list of addresses separated by a comma "," with no spaces.</strong>
            <input type="text" name="Proposers_Array" id="proposersArray" className="form-control" placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" />

            <h5>Executors</h5>
            <p>This is a list of addresses that you want to allow to execute proposals for your DAO. You can leave this blank if you would like anyone who holds tokens to be able to execute a proposal.</p>
            <strong>Must be a list of addresses separated by a comma "," with no spaces.</strong>
            <input type="text" name="Executors_Array" id="executorsArray" className="form-control" placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" />


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
            <NavLink to={`/launchpad/voting`} style={{textAlign: "end", margin: "1rem"}}>
                Step 2: Create Dao Voting Contract
                <span aria-hidden="true" className="arrow_carrot-right"></span>
            </NavLink>  
        </Card>
    </section>

  </div>
  );
}
export default Collection;

