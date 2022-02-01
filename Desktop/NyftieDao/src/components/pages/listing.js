import React, { Component } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import AuctionCreate from "../components/auctionCreate";
import { useMoralis } from "react-moralis";



const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Listing = function(props) {
  const { Moralis, isInitialized } = useMoralis()

  async function getOfferings(){
    console.log(isInitialized);
    if (isInitialized) {
      const query = new Moralis.Query("EthNFTOwners");
      query.equalTo("owner_of", props.userId);
      query.equalTo("token_id", props.tokenId);
      const data = await query.find()
      console.log(data);

      const nftURL = await data[0].get("token_uri");
      const tokenAddress = await data[0].get("token_address");
      const tokenId = props.tokenId;
      const results = await fetch(nftURL).then(response => response.json()).then(data => data);
      console.log(results);
      const name = results.name;
      const description = results.description;
      const image = results.image;
      const listedNFT = {"name":name,"nftURL":nftURL, "description":description, "image":image, "tokenAddress":tokenAddress, "tokenId":tokenId};
      console.log(listedNFT);
      return listedNFT;
    }
    else {
      let listedNFT = {};
      console.log("waiting to be initilaized");
      return listedNFT;
    }
  }

  async function populateOfferings(){
    let nftObject = await getOfferings();
    console.log(nftObject);
    let nft = await generateOfferingDisplay(nftObject.name, nftObject.nftURL, nftObject.description, nftObject.image, nftObject.tokenAddress, nftObject.tokenId );
    // console.log(nft);
    // console.log(offerings);
    displayOfferings(nft);
  }

  function displayOfferings(data){
    document.getElementById('imagePreview').innerHTML += data;
  }

  function generateOfferingDisplay(name, nftURL, description, image, tokenAddress, tokenId){
    console.log(name);
    console.log(image);
    const offeringDisplay = 
                            `<h5>Preview item</h5>
                            <div class="nft__item m-0">
                                <div class="de_countdown">
                                  <Clock deadline="December, 30, 2021" />
                                </div>
                                <div class="author_list_pp">
                                    <span>                                    
                                        <img class="lazy" src="../../../public/img/author/author-1.jpg" alt=""/>
                                    </span>
                                </div>
                                <div class="nft__item_wrap">
                                    <span>
                                        <img src=${image} class="lazy nft__item_preview" alt=""/>
                                    </span>
                                </div>
                                <div class="nft__item_info">
                                    <span >
                                        <h4>${name}</h4>
                                    </span>
                                    <div class="nft__item_price">
                                        0.08 ETH
                                    </div>
                                    <div class="nft__item_action">
                                        <span>Place a bid</span>
                                    </div>
                                    <div class="nft__item_like">
                                        <i class="fa fa-heart"></i><span>50</span>
                                    </div>
                                    <input type="string" id="nftAddress" value=${tokenAddress} hidden></input>
                                    <input type="number" id="nftID" value=${tokenId} hidden></input> 
                                    <input type="string" id="metadata" value=${nftURL} hidden></input>                              
                                </div> 
                            </div>`
    return offeringDisplay;
  }

  populateOfferings()

    return (
      <div>
      <GlobalStyles/>

        {/* <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'../../../public/img/author/author-1.jpg'})`}}>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Create</h1>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className='container'>

        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                <AuctionCreate></AuctionCreate>
              </form>
              {/* <button className="btn-main" onClick={() => getOfferings()}>Check Props</button> */}
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12" id="imagePreview">
          </div>                                         
      </div>

      </section>

        <Footer />
      </div>
    );
} 

export default Listing;
