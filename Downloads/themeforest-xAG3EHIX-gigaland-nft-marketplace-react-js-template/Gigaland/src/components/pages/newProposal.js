import React from "react";
import ColumnZero from '../components/ColumnZero';
import ColumnZeroTwo from '../components/ColumnZeroTwo';
import ColumnZeroThree from '../components/ColumnZeroThree';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralisQuery } from "react-moralis";
import NFTBalance from "../components/NFTBalance";
import styled from "styled-components";
import AuthorNFTs from "../components/AuthorNFTs";
import AuthorAuctionsList from "../components/AuthorAuctionsList";
import { Link, navigate } from '@reach/router';
import Blockies from 'react-blockies';
import Web3 from 'web3';
import governorContract from "../../abi/GovernorContract.json";
import VoteButton from "../components/VoteButton";
import {
  Card,
  Row,
  Col,
  Container,
  Button,
  Nav,
  Carousel,
  Form,
  ListGroup,
  ListGroupItem,
  ProgressBar
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
  
  const { data, error } = useMoralisQuery("Proposals", query =>
  query
    .equalTo("timeLockAddress", props.daoId)
  );


  let resultData = JSON.stringify(data);
  let resultsParsed = JSON.parse(resultData);
  const resultsObject = resultsParsed[0]
  console.log(resultsObject);

  let title = resultsObject == undefined ? "Title" : resultsObject.title;
  let author = resultsObject == undefined ? "Author" : resultsObject.author;
  let description = resultsObject == undefined ? "Description" : resultsObject.description;
  let startDate = resultsObject == undefined ? "Start Date" : resultsObject.createdAt;



  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{ padding: "0 0 0 0"}}>
        <Row style={{margin: "7rem 10rem 7rem 10rem"}}>
            <Col sm={8} >
              <NavLink to={`/dao/${props.daoId}/proposals`} style={{marginBottom: "1rem"}}>
                  <span aria-hidden="true" className="arrow_carrot-left"></span>
                  Back
              </NavLink>  
              <h2>{title}</h2>
              <p style={{color: "green", marginBottom: "1rem"}}>Open</p>
              <p>
                {description}
              </p>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header >
                        <h5 style={{marginBottom: "0"}}>Information</h5>
                    </Card.Header>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                  <strong>Author:</strong>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                  {author}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                  <strong>Start Date:</strong>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                  {startDate}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                  <strong>End Rate:</strong>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                  Feb 20, 2022
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
                <Card style={{marginTop: "2rem"}}>
                <Card.Header>
                  <h5 style={{marginBottom: "0"}}>Results</h5>
                </Card.Header>
                  <div style={{margin: "1rem"}}>
                    <Row>
                      <Col sm={6}>
                        <div>For</div>
                      </Col>
                      <Col sm={6}>
                        <div style={{textAlign: "end"}}>30%</div>
                      </Col>
                    </Row>
                    <ProgressBar now={35} />
                    <Row>
                      <Col sm={6}>
                        <div>Against</div>
                      </Col>
                      <Col sm={6}>
                        <div style={{textAlign: "end"}}>10%</div>
                      </Col>
                    </Row>
                    <ProgressBar now={10} />
                    <Row>
                      <Col sm={6}>
                        <div>Abstain</div>
                      </Col>
                      <Col sm={6}>
                        <div style={{textAlign: "end"}}>15%</div>
                      </Col>
                    </Row>
                    <ProgressBar now={15} />
                  </div>
                </Card>
                <Card style={{marginTop: "2rem"}}>
                <Card.Header>
                  <h5 style={{marginBottom: "0"}}>Cast Vote</h5>
                </Card.Header>
                  <div style={{margin: "1rem"}}>
                    <VoteButton></VoteButton>

                  </div>
                </Card>
            </Col>
        </Row>
        <div className="spacer-20"></div>
    </section>

  </div>
  );
}
export default Collection;

