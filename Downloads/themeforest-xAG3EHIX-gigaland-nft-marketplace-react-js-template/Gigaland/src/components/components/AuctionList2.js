//Real Time Updates
async function subscribeOfferings(){
    let query = new Moralis.Query("NFTAuctions");
    subscriptionAlerts = await query.subscribe();
    subscriptionAlerts.on('create', (object) => {
        cleanOfferings();
        populateOfferings();
    });
}

function cleanOfferings(){
    document.getElementById('offeringList').innerHTML = "";
}

async function populateOfferings(){
    let offeringArray = await getOfferings();
    let offerings = await getOfferingObjects(offeringArray);
    displayOfferings(offerings);
}

async function getOfferings(){
    const queryAll = new Moralis.Query("NFTAuctions");
    const data = await queryAll.find()
    auctionArray = [];
    for (let i=0; i< data.length; i++){
        const title = await data[i].get("auctionTitle");
        const imageURL = await data[i].get("metadata");
        const owner = await data[i].get("owner");
        const auction = {"title":title,"imageURL":imageURL,"owner":owner}
        auctionArray.push(auction)
    }
    return auctionArray;
}

function getOfferingObjects(array){
    let offerings = [];
    for (i=0;i<array.length;i++){
        offerings.push(generateOfferingDisplay(array[i].title,array[i].imageURL,array[i].owner))
    }
    return offerings;
}

function generateOfferingDisplay(title, imageURL, owner){
    const offeringDisplay = `<div class="row">
                                <div class="col-lg-6 text-center">
                                    <h3>Token URL:${imageURL}</h3>
                                </div>
                                <div class="col-lg-6 text-center align-middle">
                                    <h3>${title}</h3>
                                    <h4>Owned by: ${owner}</h4>
                                </div>
                            </div>`
    return offeringDisplay;
}

async function subscribeAuctions(){
    let query = new Moralis.Query("NFTAuctions");
    const subscription = await query.subscribe();
    subscription.on('create', (object) => {
      console.log("checking NFT Auctions");  
      console.log(object);
    });
  }

  async function getOfferings(){
    // const NFTAuction = Moralis.Object.extend("NFTAuctions");
    const auctionArray = [];

    const query = new Moralis.Query("NFTAuctions");
    const data = await query.find();

    for (let i=0; i< data.length; i++){
      // let flag = await isOfferingClosed(data[i].get("offeringId"));
      const title = await data[i].get("auctionTitle");
      const imageURL = await data[i].get("metadata");
      const owner = await data[i].get("owner");
      const auction = {"title":title,"imageURL":imageURL,"owner":owner}
      auctionArray.push(auction)
    }
    // data.map(
    //   (auction, index) => (
    //     <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
    //         <div className="nft__item">
    //             <div className="nft__item_wrap">
    //               <Outer>
    //                 <span>
    //                     <img src={auction.get("metadata")} className="lazy nft__item_preview" alt=""/>
    //                 </span>
    //               </Outer>
    //             </div>
    //             <div className="nft__item_info">
    //                 <h3>{auction.get("auctionTitle")}</h3>
    //                 <h4>{auction.get("owner")}</h4>                     
    //             </div> 
    //         </div>
    //     </div>  
    // ))
    console.log(auctionArray);
    for (i=0;i<auctionArray.length;i++){
      document.getElementById('offeringList').innerHTML += data[i];
  }
  }
