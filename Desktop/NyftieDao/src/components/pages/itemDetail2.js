import React from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from "react-moralis";

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


  

const Colection= function(props) {
    const { Moralis, isInitialized } = useMoralis();

    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    };
    const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    };

    async function getAuction(){
        console.log(isInitialized);
        if (isInitialized) {
        const query = new Moralis.Query("NFTAuctions");
        query.equalTo("transaction_hash", props.id);
        const data = await query.find();
        const title = await data[0].get("auctionTitle");
        const imageURL = await data[0].get("metadata");
        const owner = await data[0].get("owner");
        const objectId = await data[0].get("transaction_hash");
        const auctionObject = {"title":title,"imageURL":imageURL,"owner":owner, "objectId":objectId};
        console.log(auctionObject);
        return auctionObject;
        }
        else {
        let data = "";
        console.log("waiting to be initilaized");
        return data;
        }
    }

    getAuction()

    return (
    <div>
    <GlobalStyles/>

    <section className='container'>
        <div className='row mt-md-5 pt-md-4'>

        <div className="col-md-6 text-center">
                <img src="../img/items/big-1.jpg" className="img-fluid img-rounded mb-sm-30" alt=""/>
            </div>
            <div className="col-md-6">
                <div className="item_info">
                    Auctions ends in 
                    <div className="de_countdown">
                    <Clock deadline="December, 30, 2021" />
                    </div>
                    <h2>Pinky Ocean {title}</h2>
                    <div className="item_info_counts">
                        <div className="item_info_type"><i className="fa fa-image"></i>Art</div>
                        <div className="item_info_views"><i className="fa fa-eye"></i>250</div>
                        <div className="item_info_like"><i className="fa fa-heart"></i>18</div>
                    </div>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                    <h6>Creator</h6>
                    <div className="item_author">                                    
                        <div className="author_list_pp">
                            <span>
                                <img className="lazy" src="../img/author/author-1.jpg" alt=""/>
                                <i className="fa fa-check"></i>
                            </span>
                        </div>                                    
                        <div className="author_list_info">
                            <span>Monica Lucas</span>
                        </div>
                    </div>

                    <div className="spacer-40"></div>

                    <div className="de_tab">

                    <ul className="de_nav">
                        <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Bids</span></li>
                        <li id='Mainbtn1' className=''><span onClick={handleBtnClick1}>History</span></li>
                    </ul>
                    
                    <div className="de_tab_content">
                        {openMenu && (  
                        <div className="tab-1 onStep fadeIn">
                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-1.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid accepted <b>0.005 ETH</b>
                                    <span>by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-2.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.005 ETH</b>
                                    <span>by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-3.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.004 ETH</b>
                                    <span>by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-4.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.003 ETH</b>
                                    <span>by <b>Lori Hart</b> at 6/12/2021, 12:57 AM</span>
                                </div>
                            </div>
                        </div>
                        )}

                        {openMenu1 && ( 
                        <div className="tab-2 onStep fadeIn">
                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-5.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.005 ETH</b>
                                    <span>by <b>Jimmy Wright</b> at 6/14/2021, 6:40 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-1.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid accepted <b>0.005 ETH</b>
                                    <span>by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-2.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.005 ETH</b>
                                    <span>by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-3.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.004 ETH</b>
                                    <span>by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM</span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="../img/author/author-4.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Bid <b>0.003 ETH</b>
                                    <span>by <b>Lori Hart</b> at 6/12/2021, 12:57 AM</span>
                                </div>
                            </div>
                        </div>
                        )}
                        
                    </div>
                    
                </div>
                    
                </div>
            </div>

        </div>
    </section>

    <Footer />
    </div>
    );
}

//-------------------------------------------------------------------------------------------------------------------

    const { Moralis, isInitialized } = useMoralis();

    // const [openMenu, setOpenMenu] = React.useState(true);
    // const [openMenu1, setOpenMenu1] = React.useState(false);
    // const handleBtnClick = () => {
    // setOpenMenu(!openMenu);
    // setOpenMenu1(false);
    // document.getElementById("Mainbtn").classList.add("active");
    // document.getElementById("Mainbtn1").classList.remove("active");
    // };
    // const handleBtnClick1 = () => {
    // setOpenMenu1(!openMenu1);
    // setOpenMenu(false);
    // document.getElementById("Mainbtn1").classList.add("active");
    // document.getElementById("Mainbtn").classList.remove("active");
    // };

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
        const objectId = await data[0].get("transaction_hash");
        const auctionObject = {"title":title,"nftURL":nftURL,"owner":owner, "objectId":objectId, "imageURL":imageURL, "nftName":nftName, "description":description};
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
        let auctionObject = await generateOfferingDisplay(auction.title,auction.nftURL,auction.owner,auction.objectId, auction.imageURL, auction.nftName, auction.description);
        // console.log(auctionObject);
        displayOfferings(auctionObject);
      }

    function setHighestBid(id){
      console.log("testing");
    }

    function generateOfferingDisplay(title, nftURL, owner, objectId, imageURL, nftName, description){
        console.log(title);
        const offeringDisplay = 
                            `<div class="col-md-6 text-center">
                                <img src=${imageURL} class="img-fluid img-rounded mb-sm-30" alt=""/>
                            </div>
                            <div class="col-md-6">
                                <div class="item_info">
                                  <p>${title}</p>
                                  <h2>${nftName}</h2>
                                  <p>Owned by ${owner}</p>
                                  <div class="item_info_counts">
                                      <div class="item_info_type"><i class="fa fa-image"></i>Art</div>
                                      <div class="item_info_views"><i class="fa fa-eye"></i>250</div>
                                      <div class="item_info_like"><i class="fa fa-heart"></i>18</div>
                                  </div>
                                  <p>${description}</p>            
                                  <div class="spacer-40"></div>                                  
                                </div>
                            </div>`
        return offeringDisplay;
      }

    function displayOfferings(data){
        // console.log(data);
        document.getElementById('auctionDisplay').innerHTML = data;
    }

    populateAuctions()

    return (
    <div>
    <GlobalStyles/>

    <section className='container'>
        <div className='row mt-md-5 pt-md-4' id="auctionDisplay">

        </div>
        <button className="btn-main" onClick={() => setHighestBid(1)}>Place Bid</button> 
    </section>

    <Footer />
    </div>
    );
    
export default Colection;

