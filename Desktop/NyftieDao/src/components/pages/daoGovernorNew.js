import React from "react";
import ColumnZero from '../components/ColumnZero';
import ColumnZeroTwo from '../components/ColumnZeroTwo';
import ColumnZeroThree from '../components/ColumnZeroThree';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis, useNewMoralisObject, useMoralisQuery } from "react-moralis";
import NFTBalance from "../components/NFTBalance";
import styled from "styled-components";
import AuthorNFTs from "../components/AuthorNFTs";
import AuthorAuctionsList from "../components/AuthorAuctionsList";
import { Link, navigate } from '@reach/router';
import Blockies from 'react-blockies';
import Web3 from 'web3';
import governorContract from "../../abi/GovernorContract.json";
import governanceTimeLock from "../../abi/GovernanceTimeLock.json";
import { 
    Card,
    Row,
    Col,
    Container,
    Button,
    Nav,
    Carousel,
    Form
    } from 'react-bootstrap';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

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

const Collection= function(props) {

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  const { isSaving, error, save } = useNewMoralisObject('Proposals');
  
  const { data } = useMoralisQuery("DAOs", query =>
  query
    .equalTo("timeLockAddress", props.daoId)
  );


  let resultData = JSON.stringify(data);
  let resultsParsed = JSON.parse(resultData);
  const resultsObject = resultsParsed[0]
  console.log(resultsObject);

  let govAddress = resultsObject == undefined ? "0xd465cf22884D52924c7dce3A30E406E62e1e60b2" : resultsObject.governorAddress;

  let name = resultsObject == undefined ? "Name" : resultsObject.govName;
  
  const timeLockAddress = props.daoId;


  const auction_contract_address = "0x35D7Ef050319Dc6F892470c3270ba546E579A17F"

  // Create timeLock instance
  let timeLockContract = new web3.eth.Contract(
    governanceTimeLock.abi,
    props.daoId
    );
    timeLockContract.options.data = governanceTimeLock.bytecode;

  // Create splitter instance
  let votingContract = new web3.eth.Contract(
    governorContract.abi,
    govAddress
    );
    votingContract.options.data = governorContract.bytecode;


  async function createProposal(){

    const title =  document.getElementById("title").value;
    const description =  document.getElementById("description").value;
    const targets =  props.daoId
    const values = 0
    const team = document.getElementById("team").value;
    const amount = document.getElementById("amount").value;

    const encodedCallData = timeLockContract.methods.payTeam(team, amount).encodeABI();
    
    votingContract.methods.propose(
      [targets],
      [values],
      [encodedCallData],
      description,
    ).send({
      from: window.ethereum.selectedAddress
    }).then(function(results){
      console.log(results);

      // timeLockAddress = props.daoId
      const author = window.ethereum.selectedAddress;

      save({title, description, timeLockAddress, team, amount, govAddress, author})
      // save({govName, tokenAdddress, timeLockAddress, splitterAddress, NFTAddress, governorAddress});

      setIsButtonLoading(false);
  });
    

  
    // const transactionParameters = {
    //   to: auction_contract_address,
    //   from: window.ethereum.selectedAddress,
    //   data: encodedCallData
    // };
    // const txt = await window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionParameters]
    // });
    // return txt
}



  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{height: "100vh", padding: "0 0 0 0"}}>
        <Row style={{margin: "7rem 3rem 7rem 3rem"}}>
            <Col sm={3}>
                <Card>
                    <Card.Header className="text-center" >
                        <Blockies 
                          seed={props.daoId}
                          size={10} 
                          scale={10} 
                          style={{borderRadius: "50%", borderWidth: "2", width: "70px", margin: "1rem auto"}} />
                        <h3 style={{margin: "1rem auto" }}>{name}</h3>
                    </Card.Header>
                    <Nav defaultActiveKey={`/dao/${props.daoId}`} className="flex-column">
                        <Nav.Link href={`/dao/${props.daoId}`}>Overview</Nav.Link>
                        <Nav.Link href={`/dao/${props.daoId}/proposals`}>Proposals</Nav.Link>
                        <Nav.Link href={`/dao/${props.daoId}/new`}>Create Proposal</Nav.Link>
                        <Nav.Link href={`/dao/${props.daoId}/delegate`}>Delegate</Nav.Link>
                        <Nav.Link href={`/dao/${props.daoId}/about`}>About</Nav.Link>
                    </Nav>
                </Card>
            </Col>
            <Col sm={9}>
              <h5>Title</h5>
                <input type="text" name="item_title" id="title" className="form-control" placeholder="e.g. Allow team memeber to take out money" />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea data-autoresize name="item_desc" id="description" className="form-control" placeholder="e.g. Team members have completed theri promises and can take out more money"></textarea>

                <div className="spacer-10"></div>

                <h5>Team Address</h5>
                <input type="text" name="item_title" id="team" className="form-control" placeholder="e.g. Address" />

                <h5>Amount in AVAX</h5>
                <input type="number" name="item_title" id="amount" className="form-control" placeholder="e.g. Allow team memeber to take out money" />

                <h5>Voting Contract</h5>
                <div>{govAddress}</div>

                <Button
                  style={{margin: "1rem auto"}}
                  onClick={() => {
                    setIsButtonLoading(true);
                    createProposal();
                  }}
                  isLoading={isButtonLoading}
                >
                  Create Proposal
                </Button>
            </Col>
        </Row>
    </section>

  </div>
  );
}
export default Collection;

