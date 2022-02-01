import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { Link, navigate } from '@reach/router';
import Web3 from 'web3';
import mintableCrowdsale from "../../abi/MintableCrowdsale.json";
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
  const { isSaving, save } = useNewMoralisObject('IMOs');


  // Create splitter instance
  let crowdsaleContract = new web3.eth.Contract(
    mintableCrowdsale.abi
    );
    crowdsaleContract.options.data = mintableCrowdsale.bytecode;

  let tokenAdddress = localStorage.getItem('token');
  let timeLockAddress = localStorage.getItem('timeLock');
  let splitterAddress = localStorage.getItem('splitter');
  let NFTAddress = localStorage.getItem('NFTtoken');

  const testWeb3 = () => {
    const startTime = document.getElementById("startTime").valueAsNumber;
    const endTime = document.getElementById("endTime").valueAsNumber;
    const rate = document.getElementById("rate").value;

    crowdsaleContract.deploy({
        arguments: [
          startTime,
          endTime,
          rate,
          props.daoId,
          props.tokenId,
        ]
    })
    .send({
        from: window.ethereum.selectedAddress
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address

        let IMOAddress = newContractInstance.options.address

        localStorage.setItem('IMO', newContractInstance.options.address);

        save({tokenAdddress, timeLockAddress, splitterAddress, NFTAddress, IMOAddress, startTime, endTime, rate});

        setIsButtonLoading(false);
    });
  }; 

  function testContract() {
    const startTime = document.getElementById("startTime").valueAsNumber;
    let time = Date.now();
    let d = new Date(startTime);
    console.log(d);
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
            <Row>
                <Col sm={6}>
                  <h5>Start Date </h5>
                  <strong>Must be at least be 1 day after today.</strong><br/>
                  <input type="date" id="startTime" style={{margin: "1rem 0"}}></input>
                </Col>
                <Col sm={6}>
                  <h5>End Date</h5>
                  <strong>Must be 1 day after Start Date.</strong><br/>
                  <input type="date" id="endTime" style={{margin: "1rem 0"}}></input>
                </Col>
            </Row>


            <h5>Trade Rate</h5>
            <p>
              This is the rate at which inverstors will trade their AVAX for your Governance Token. i.e. A rate of 2 will mean they will get 2 Governance Tokens for 1 AVAX.
            </p>
            <input type="number" name="Executors_Array" id="rate" className="form-control" placeholder="e.g. 2" />

            <h5>Cap</h5>
            <p>
              This is the total amount of Governance Tokens you are willing to sell.
            </p>
            <input type="number" name="Executors_Array" id="Cap" className="form-control" placeholder="e.g. 500,000" />


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
            <NavLink to={`/dao/${props.daoId}`} style={{textAlign: "end", margin: "1rem"}}>
                Go to DAO Homepage
                <span aria-hidden="true" className="arrow_carrot-right"></span>
            </NavLink>  
        </Card>
    </section>

  </div>
  );
}
export default Collection;

