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

    <section className='contatiner no-bottom' style={{ padding: "0 0 0 0"}}>
        <Row style={{margin: "7rem 10rem 7rem 10rem"}}>
            <Col sm={8} >
              <NavLink to={'/dao/:daoId/proposals'} style={{marginBottom: "1rem"}}>
                  <span aria-hidden="true" className="arrow_carrot-left"></span>
                  Back
              </NavLink>  
              <h2>Delegate</h2>
              <Card>
                  <Card.Header >
                      <h5 style={{marginBottom: "0"}}>Select Delegate</h5>
                  </Card.Header>
                  <div style={{margin: "1rem"}}>
                  To:
                  <input type="text" name="item_title" id="delegatee" className="form-control" placeholder="e.g. Your Address" />
                  </div>
              </Card>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header >
                        <h5 style={{marginBottom: "0"}}>Actions</h5>
                    </Card.Header>
                    <button className="btn-main" style={{margin: "1rem auto", width: "80%"}}>Confirm</button> 
                </Card>
            </Col>
        </Row>
        <div className="spacer-20"></div>
    </section>

  </div>
  );
}
export default Collection;

