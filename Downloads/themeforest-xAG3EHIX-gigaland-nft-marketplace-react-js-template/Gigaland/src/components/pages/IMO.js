import React from 'react';
import Select from 'react-select'
import ColumnNew from '../components/ColumnNew';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import AuctionList from "../components/AuctionList";
import CarouselCollection from "../components/CarouselCollection";
import IMOCard from "../components/IMOCard";
import styled from "styled-components";
import IMODescription from "../components/IMODescription";
import { 
  Card,
  Row,
  Col,
  Container
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


const options = [
  { value: 'All categories', label: 'All categories' },
  { value: 'Art', label: 'Art' },
  { value: 'Music', label: 'Music' },
  { value: 'Domain Names', label: 'Domain Names' }
]
const options1 = [
  { value: 'Buy Now', label: 'Buy Now' },
  { value: 'On Auction', label: 'On Auction' },
  { value: 'Has Offers', label: 'Has Offers' }
]
const options2 = [
  { value: 'All Items', label: 'All Items' },
  { value: 'Single Items', label: 'Single Items' },
  { value: 'Bundles', label: 'Bundles' }
]


const IMO = (props) => (
  <div>
    <GlobalStyles/>
      <section className='container no-bottom mt-2'>
        <Row>
          <Col sm={4}>
            <IMOCard imoID={props.imoID}/>
          </Col>
          <Col sm={8}>
            <IMODescription imoID={props.imoID}/>
          </Col>
        </Row>
      </section>
    <Footer />
  </div>


);
export default IMO;