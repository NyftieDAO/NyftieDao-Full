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

function AuthorNFTs({authorID}) {
  const { Moralis, isInitialized } = useMoralis()
  
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
    // console.log(offerings);
    displayOfferings(offerings);
  }

  async function getOfferings(){
    console.log(isInitialized);
    if (isInitialized) {
      const options = { chain: 'ropsten', address: authorID};
      const ropstenNFTs = await Moralis.Web3API.account.getNFTs(options);
      console.log(ropstenNFTs.result);
      const nftArray = ropstenNFTs.result
      return nftArray;
    }
    else {
      let nftArray = [];
      console.log("waiting to be initilaized");
      return nftArray;
    }
  }

  async function getOfferingObjects(array){
    let offerings = [];
    for (let i=0;i<array.length;i++){
      const metadata = await fetch(array[i].token_uri).then(response => response.json()).then(data => data);
      // const metadataJSON = JSON.parse(metadata);
      console.log(metadata);

        offerings.push(generateOfferingDisplay(
          metadata.name,
          array[i].token_uri,
          array[i].owner_of,
          i,
          array[i].block_number,
          metadata.image,
          array[i].token_id
          ));
    }
    return offerings;
  }

  function generateOfferingDisplay(title, nftURL, owner, index, objectId, imageURL, currentBid){
    console.log(title);
    console.log(imageURL);
    const offeringDisplay = 
                            `<div key=${index} class="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
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
                                  </div> 
                              </div>
                          </div>`
    return offeringDisplay;
  }

  populateOfferings()

    return ( 
        <div>
          <div className='row'id="offeringList"></div>
          {/* <button className="btn-main" onClick={() => getOfferings()}>Get Auctions</button> */}
        </div>
    );
};

export default AuthorNFTs;