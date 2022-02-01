import React from "react";
import ColumnZero from '../components/ColumnZero';
import ColumnZeroTwo from '../components/ColumnZeroTwo';
import ColumnZeroThree from '../components/ColumnZeroThree';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";
import NFTBalance from "../components/NFTBalance";
import UserAuctionList from "../components/UserAuctionList";
import UserNFTs from "../components/UserNFTs";
import Dashboard from "../components/Dashboard";
import Blockies from 'react-blockies';
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

const Collection= function(props) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };

  const { user } = useMoralis();
  let userAddress = ""

  if (!user) {
    userAddress = "not signed in"
  }
  else {
    userAddress = user.get("ethAddress")
  }


  return (
  <div>
  <GlobalStyles/>

  <section className='contatiner no-bottom' style={{padding: "0 0 0 0"}}>
        <Row style={{margin: "7rem 3rem 7rem 3rem"}}>
            <Col sm={3}>
                <Card>
                    <Card.Header className="text-center" >
                        <Blockies 
                          seed={props.userId}
                          size={10} 
                          scale={10} 
                          style={{borderRadius: "50%", borderWidth: "2", width: "70px", margin: "1rem auto"}} />
                        <h3 style={{margin: "1rem auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{props.userId}</h3>
                    </Card.Header>
                    <Nav defaultActiveKey="/dao/:daoId" className="flex-column">
                        <Nav.Link href="/dao/:daoId">Overview</Nav.Link>
                        <Nav.Link href="/dao/:daoId/proposals">Proposals</Nav.Link>
                        <Nav.Link href="/dao/:daoId/new">Create Proposal</Nav.Link>
                        <Nav.Link href="/dao/:daoId/delegate">Delegate</Nav.Link>
                        <Nav.Link href="/dao/:daoId/about">About</Nav.Link>
                    </Nav>
                </Card>
            </Col>
            <Col sm={9}>
                <h3>Daos</h3>
                <Card> 
                  <div style={{margin: "0 1rem"}}>
                    <table className="table table-hover caption-top">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Token</th>
                                <th scope="col">Amount</th>
                                <th scope="col">% of Pool</th>
                                <th scope="col">NFTs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>
                                <a href='/dao/posters'>Posters</a>
                            </td>
                            <td>POS</td>
                            <td>328</td>
                            <td>1.2%</td>
                            <td>1</td>
                            </tr>
                            <tr>
                            <td>
                                <a href='/dao/NFTgame'>NFTgame</a>
                            </td>
                            <td>NFTG</td>
                            <td>1087</td>
                            <td>15.2%</td>
                            <td>12</td>
                            </tr>
                            <tr>
                            <td>
                                <a href='/dao/VRCasino'>VRCasino</a>
                            </td>
                            <td>VRC</td>
                            <td>201</td>
                            <td>0.2%</td>
                            <td>8</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </Card>
                <h3 style={{marginTop: "1rem"}}>Nfts</h3>
                <section className='container no-top' style={{padding: "0"}}>
                    <div className='row'>
                      <div className='col-lg-12'>
                          <div className="items_filter">
                            <ul className="de_nav text-left">
                                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Created</span></li>
                                <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Liked</span></li>
                            </ul>
                        </div>
                      </div>
                    </div>
                  {openMenu && (  
                    <div id='zero1' className='onStep fadeIn'>
                    <UserAuctionList userId={props.userId}></UserAuctionList>
                    </div>
                  )}
                  {openMenu1 && ( 
                    <div id='zero2' className='onStep fadeIn'>
                    {/* <NFTBalance/> */}
                    <UserNFTs userId={props.userId}></UserNFTs>
                    </div>
                  )}
                </section>
            </Col>
        </Row>
    </section>


    <Footer />
  </div>
  );
}
export default Collection;