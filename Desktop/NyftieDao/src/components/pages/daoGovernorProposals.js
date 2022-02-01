import React from "react";
import ColumnZero from '../components/ColumnZero';
import ColumnZeroTwo from '../components/ColumnZeroTwo';
import ColumnZeroThree from '../components/ColumnZeroThree';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";
import NFTBalance from "../components/NFTBalance";
import styled from "styled-components";
import AuthorNFTs from "../components/AuthorNFTs";
import AuthorAuctionsList from "../components/AuthorAuctionsList";
import { Link, navigate } from '@reach/router';
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

   const { user, Moralis } = useMoralis();
  // let userAddress = ""

  // if (!user) {
  //   userAddress = "not signed in"
  // }
  // else {
  //   userAddress = user.get("ethAddress")
  // }



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
                        <h3 style={{margin: "1rem auto" }}>{props.daoId}</h3>
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
                <h3>Proposals</h3>
                <Card className="nft__item" style={{cursor: "pointer"}}  onClick={()=> window.open(`/dao/${props.daoId}/proposal/:proposalID`, "_self")}>
                  <div style={{margin: "1rem"}}>
                    <Row style={{margin: "0 0 1rem 0"}}>
                      <Col sm={6} style={{display: "inline"}}>
                        <img style={{borderRadius: "50%", width: "20px"}} src="../../../public/img/author/author-1.jpg"></img>
                        <span style={{margin: "0 auto 0 1rem"}}>DAO Name by Address</span>
                      </Col>
                      <Col sm={6} style={{textAlign: "end"}}>
                          <span style={{color: "red"}}>closed</span>
                      </Col>
                    </Row>
                    <Row>
                      <h3>Title of Proposal</h3>
                    </Row>
                    <Row>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </Row>
                  </div>
                </Card>
            </Col>
        </Row>
    </section>

  </div>
  );
}
export default Collection;

