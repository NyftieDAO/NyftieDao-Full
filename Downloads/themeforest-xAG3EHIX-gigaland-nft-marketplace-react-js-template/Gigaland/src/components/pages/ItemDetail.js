import React from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";
import Web3 from 'web3';
import BidButton from "../components/BidButton";
import FinalizeAuction from "../components/FinalizeAuction";
import ApproveButton from "../components/ApproveButton";


const web3 = new Web3(window.ethereum);


const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
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


  

const Colection = function(props) {
  const { Moralis, isInitialized } = useMoralis();

  async function getAuction(){
      console.log(isInitialized);
      if (isInitialized) {
      const query = new Moralis.Query("NFTAuctions");
      query.equalTo("transaction_hash", props.id);
      const data = await query.find();
      const title = await data[0].get("auctionTitle");
      const nftURL = await data[0].get("metadata");
      const results = await fetch(nftURL).then(response => response.json()).then(data => data);
      const imageURL = await results.image;
      const nftName = await results.name;
      const description = await results.description;
      const owner = await data[0].get("owner");
      const startingPrice = await data[0].get("startPrice");
      const objectId = await data[0].get("deedId");
      const auctionId = await data[0].get("auctionId");
      const auctionObject = {
        "title":title,
        "nftURL":nftURL,
        "owner":owner,
        "objectId":objectId,
        "imageURL":imageURL,
        "nftName":nftName,
        "description":description,
        "startingPrice":startingPrice,
        "auctionId":auctionId
      };
      // console.log(auctionObject);
      return auctionObject;
      }
      else {
      let data = "";
      console.log("waiting to be initilaized");
      return data;
      }
  }

  async function populateAuctions(){
    let auction = await getAuction();
    let auctionObject = await generateOfferingDisplay(
        auction.title,
        auction.nftURL,
        auction.owner,
        auction.objectId,
        auction.imageURL,
        auction.nftName,
        auction.description,
        auction.startingPrice,
        auction.auctionId
      );
    // console.log(auctionObject);
    displayOfferings(auctionObject);
  }

  
  function generateOfferingDisplay(title, nftURL, owner, objectId, imageURL, nftName, description, startingPrice, auctionId){
    const offeringDisplay = 
                          `<div class="col-md-6 text-center">
                              <img src=${imageURL} class="img-fluid img-rounded mb-sm-30" alt=""/>
                          </div>
                          <div class="col-md-6">
                              <div class="item_info">
                                <p>${title}</p>
                                <h2>${nftName}</h2>
                                <a href="/Author/${owner}">Owned by ${owner}</a>
                                <div class="item_info_counts">
                                    <div class="item_info_type"><i class="fa fa-image"></i>Art</div>
                                    <div class="item_info_views"><i class="fa fa-eye"></i>250</div>
                                    <div class="item_info_like"><i class="fa fa-heart"></i>18</div>
                                </div>
                                <p>${description}</p>
                                <h4>Current Bid: ${startingPrice} eth</h4>            
                                <div class="spacer-40"></div> 
                                <input type="string" id="auctionNumber" value=${auctionId} hidden></input>
                                <input type="string" id="tokenId" value=${objectId} hidden></input> 
                                <input type="number" id="bidAmount">Bid Amount</input>
                                <BidButton/>                           
                              </div>
                          </div>`
      return offeringDisplay;
    }

  function displayOfferings(data){
      // console.log(data);
      document.getElementById('auctionDisplay').innerHTML = data;
  }

  async function subscribeBids(){
    if (isInitialized) {
      let query = new Moralis.Query("auctionBids");
      const subscriptionAlerts = await query.subscribe();
      subscriptionAlerts.on('create', (object) => {
        console.log(object.attributes.from);
        setHighestBid(object.attributes.bidAmount, object.attributes.from);
        populateAuctions();
      });
    }
    else {
      let data = "";
      console.log("waiting to be initilaized");
      return data;
      }
  }

  async function setHighestBid(bidNumber, from){
    const bid = bidNumber;
    const highestBidder = from;
    console.log(highestBidder);
    const query = new Moralis.Query("NFTAuctions");
    query.equalTo("transaction_hash", props.id);
    const data = await query.find();
    const auction = await data[0];
    console.log(data[0]);
    auction.set("startPrice", bid);
    auction.set("highestBidder", highestBidder);
    console.log(`set bid to ${bid}`);
    return auction.save();
  }

  function setApproved() {
    document.getElementById('isApproved').innerHTML = "<p>Approved</p>"; 
  }

  async function subscribeApprove(){
    if (isInitialized) {
      let query = new Moralis.Query("AuctionApproval");
      const subscriptionAlerts = await query.subscribe();
      subscriptionAlerts.on('create', (object) => {
        console.log(object.attributes);
        setApproved();
      });
    }
    else {
      let data = "";
      console.log("waiting to be initilaized");
      return data;
      }
  }


  populateAuctions()
  subscribeBids()
  subscribeApprove()

  return (
  <div>
  <GlobalStyles/>

  <section className='container'>
      <div className='row mt-md-5 pt-md-4' id="auctionDisplay">

      </div>
      {/* <button className="btn-main" onClick={() => setHighestBid()}>Test</button> */}
      <div id="isApproved">
        <p>Not Approved</p>
      </div>
      
      <div class="spacer-40"></div> 
      
      <BidButton/>
      
      <div class="spacer-40"></div> 
      
      <FinalizeAuction/>

      <div class="spacer-40"></div> 
      
      <ApproveButton/>
      {/* <input type="number" id="bidNumber">Bid Amount</input> */}

  </section>

  <Footer />
  </div>
  );
}
export default Colection;