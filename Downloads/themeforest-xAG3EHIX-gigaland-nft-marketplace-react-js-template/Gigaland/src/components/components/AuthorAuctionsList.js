import React from 'react';
import Web3 from 'web3';
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { Link } from '@reach/router';
// const web3 = new Web3(window.ethereum);
// const auction_contract_address = "0x68D91f67bd91561425aA9725C19E246d419aCA0d"

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

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

function AuctionList({authorID}) {
  const { Moralis, isInitialized } = useMoralis();

  //Real Time Updates
  async function subscribeOfferings(){
      let query = new Moralis.Query("NFTAuctions");
      const subscriptionAlerts = await query.subscribe();
      subscriptionAlerts.on('create', (object) => {
          cleanOfferings();
          populateOfferings();
      });
  }
  
  function displayOfferings(data){
    for (let i=0;i<data.length;i++){
        document.getElementById('offeringList').innerHTML += data[i];
    }
  }

  function cleanOfferings(){
    document.getElementById('offeringList').innerHTML = "";
  }

  async function populateOfferings(){
    let offeringArray = await getOfferings();
    let offerings = await getOfferingObjects(offeringArray);
    console.log(offeringArray);
    displayOfferings(offerings);
  }

  async function getOfferings(){
    console.log(isInitialized);
    if (isInitialized) {
      const query = new Moralis.Query("NFTAuctions");
      query.equalTo("owner", authorID);
      const data = await query.find()
      let auctionArray = [];
      for (let i=0; i< data.length; i++){
        const title = await data[i].get("auctionTitle");
        const nftURL = await data[i].get("metadata");
        const owner = await data[i].get("owner");
        const objectId = await data[i].get("transaction_hash");
        const results = await fetch(nftURL).then(response => response.json()).then(data => data);
        const imageURL = await results.image;
        const currentBid = await data[i].get("startPrice")
        // console.log(objectId);
        const index = i;
        const auction = {"title":title,"nftURL":nftURL,"owner":owner, "index":index, "objectId":objectId, "imageURL":imageURL, "currentBid":currentBid};
        auctionArray.push(auction);
      }
      return auctionArray;
    }
    else {
      let auctionArray = [];
      console.log("waiting to be initilaized");
      return auctionArray;
    }
  }

  function getOfferingObjects(array){
    let offerings = [];
    for (let i=0;i<array.length;i++){
        offerings.push(generateOfferingDisplay(
          array[i].title,
          array[i].nftURL,
          array[i].owner,
          array[i].index,
          array[i].objectId,
          array[i].imageURL,
          array[i].currentBid
          ));
    }
    return offerings;
  }

  function generateOfferingDisplay(title, nftURL, owner, index, objectId, imageURL, currentBid){
    const offeringDisplay = 
                            `<div key=${index} class="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <a href="/ItemDetail/${objectId}">
                              <div class="nft__item">
                                  <div class="nft__item_wrap">
                                    <Outer>
                                      <span>
                                          <img src=${imageURL} class="lazy nft__item_preview" alt=""/>
                                      </span>
                                    </Outer>
                                  </div>
                                  <div class="nft__item_info">
                                    <h4 style="width: 200px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${owner}</h4> 
                                    <h4>${title}</h4>
                                    <p>Current Bid ${currentBid}</p>                
                                  </div> 
                              </div>
                            </a> 
                          </div>`
    return offeringDisplay;
  }

  populateOfferings()

    return ( 
        <div>
          <div className='row'id="offeringList"></div>
        </div>
    );
};

export default AuctionList;