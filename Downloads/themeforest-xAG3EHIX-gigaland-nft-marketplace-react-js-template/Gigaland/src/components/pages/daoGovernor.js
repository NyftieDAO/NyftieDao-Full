import React, { useState } from "react";
import { createGlobalStyle } from 'styled-components';
import { useMoralis, useMoralisQuery } from "react-moralis";
import styled from "styled-components";
import { Link, navigate } from '@reach/router';
import Blockies from 'react-blockies';
import Web3 from 'web3';


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

  // const { Moralis, isInitialized } = useMoralis();
  // const [isLoading, setLoading] = useState(true);

  
  // const daoData = await Moralis.Object.extend("DAOs");
  // const query = new Moralis.Query(daoData);
  // query.equalTo("timeLockAddress", props.daoId);
  // const results = await query.find();
  // let resultData = await JSON.stringify(results);
  // let resultsParsed = await JSON.parse(resultData);
  // const resultsObject = await resultsParsed[0]
  // console.log(resultsObject);

  const { data, error } = useMoralisQuery("DAOs", query =>
  query
    .equalTo("timeLockAddress", props.daoId)
  );


  let resultData = JSON.stringify(data);
  let resultsParsed = JSON.parse(resultData);
  const resultsObject = resultsParsed[0]
  console.log(resultsObject);

  let name = resultsObject == undefined ? "Name" : resultsObject.govName;
  let NFTlocation = resultsObject == undefined ? "NFT" : resultsObject.NFTAddress;
  let tokenLocation= resultsObject == undefined ? "TOKEN" : resultsObject.tokenAdddress;

  // let name = "Name";
  // let NFTlocation =  "NFT";
  // let tokenLocation= "TOKEN";



  // const accountBalance = web3.eth.getBalance(props.daoId);

  // const metadata = accountBalance.then(function(response) {
  //     let testData = JSON.stringify(response);
  //     let testParsed = JSON.parse(testData);
  //     const testObject = testParsed[0];
  //     return testObject;
  // });

  // console.log(metadata);


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
                <h3>Overview</h3>
                <Card>
                  <h3>{NFTlocation}</h3>
                  <h3>{tokenLocation}</h3>
                </Card>
            </Col>
        </Row>
    </section>

  </div>
  );
}
export default Collection;

