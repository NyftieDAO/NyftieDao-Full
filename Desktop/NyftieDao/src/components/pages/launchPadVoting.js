import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { Link, navigate } from '@reach/router';
import Web3 from 'web3';
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
  const { isSaving, error, save } = useNewMoralisObject('DAOs');

  // Create splitter instance
  let votingContract = new web3.eth.Contract(
    governorContract.abi
    );
    votingContract.options.data = governorContract.bytecode;

  let tokenAdddress = localStorage.getItem('token');
  let timeLockAddress = localStorage.getItem('timeLock');
  let splitterAddress = localStorage.getItem('splitter');
  let NFTAddress = localStorage.getItem('NFTtoken');

  const testWeb3 = () => {
    const govName = document.getElementById("govName").value;
    const quorumPercentage = document.getElementById("quorumPercentage").value;
    const votingPeriod = document.getElementById("votingPeriod").value;

    votingContract.deploy({
        arguments: [
          tokenAdddress,
          timeLockAddress,
          govName,
          quorumPercentage,
          votingPeriod,
          30
        ]
    })
    .send({
        from: window.ethereum.selectedAddress
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address

        let governorAddress = newContractInstance.options.address

        localStorage.setItem('governor', newContractInstance.options.address);

        save({govName, tokenAdddress, timeLockAddress, splitterAddress, NFTAddress, governorAddress});

        setIsButtonLoading(false);
    });
  }; 

  function testContract() {
    save({tokenAdddress, timeLockAddress, splitterAddress, NFTAddress});
    setIsButtonLoading(false);
  }

  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{padding: "0 0 0 0"}}>
        <Card style={{margin: "7rem"}}>
            <h2 className="text-center" style={{margin: "3rem 0 3rem 0"}}>Create Your Dao Governance Contract</h2>
            <div className="field-set" style={{margin: "0 5rem 0 5rem"}}>
            <div className="spacer-10"></div>

            <h5>Dao Name </h5>
            <input type="text" name="Proposers_Array" id="govName" className="form-control" placeholder="e.g. BoardApe Dao" />

            <h5>Quorum Percentage</h5>
            <p>
              This is the percent of voters that need to participate in a vote in order for the vote to be considered valid.
            </p>
            <input type="number" name="Executors_Array" id="quorumPercentage" className="form-control" placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" />

            <h5>Voting Period</h5>
            <p>
              This is the amount of time (in seconds) that a proposal can be voted on.
            </p>
            <input type="number" name="Executors_Array" id="votingPeriod" className="form-control" placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" />


                <Button
                  style={{margin: "1rem auto"}}
                  onClick={() => {
                    setIsButtonLoading(true);
                    testWeb3();
                  }}
                  isLoading={isButtonLoading}
                >
                  Deploy Voting Contract
                </Button>
            </div>
            <NavLink to={`/dao/${localStorage.getItem('timeLock')}`} style={{textAlign: "end", margin: "1rem"}}>
                Go to DAO Homepage
                <span aria-hidden="true" className="arrow_carrot-right"></span>
            </NavLink>  
        </Card>
    </section>

  </div>
  );
}
export default Collection;

